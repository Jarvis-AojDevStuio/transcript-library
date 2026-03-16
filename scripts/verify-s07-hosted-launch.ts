import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { evaluateHostedLaunchEvidence, HostedLaunchEvidence, HostedLaunchVerdict } from "../src/lib/hosted-launch-proof.ts";

function isProcessOnline(name: string): boolean {
  try {
    const output = execSync('pm2 jlist', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    const list = JSON.parse(output);
    const proc = list.find((p: any) => p.name === name);
    return proc && proc.pm2_env.status === 'online';
  } catch {
    return false;
  }
}

function isSystemdActive(unit: string): boolean {
  try {
    const output = execSync(`systemctl is-active ${unit}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return output === 'active';
  } catch {
    return false;
  }
}

function hasExecutable(name: string): boolean {
  try {
    execSync(`which ${name}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

export function gatherEvidence(): HostedLaunchEvidence {
  const isSimulated = process.argv.includes('--emit-diagnostic-bundle');
  if (isSimulated) {
    return {
      optCurrentExists: true,
      optCurrentPointsToRelease: true,
      srvExists: true,
      nodeEnvIsProduction: true,
      hasTsx: false, // Force failure
      pm2ProcessOnline: true,
      deployHookServiceActive: true,
      sweepServiceActive: true,
      lastSourceRefreshExists: true,
      lastImportValidationExists: true,
      dailySweepLatestExists: true,
      sweepManualFollowUpVideoIds: [],
      analysisArtifactsInSrv: true,
      analysisArtifactsInOpt: false,
      humanBrowserProofCompleted: true,
    };
  }

  const optCurrent = '/opt/transcript-library/current';
  const srvBase = '/srv/transcript-library';
  
  const optCurrentExists = fs.existsSync(optCurrent);
  let optCurrentPointsToRelease = false;
  if (optCurrentExists) {
    try {
      optCurrentPointsToRelease = fs.lstatSync(optCurrent).isSymbolicLink();
    } catch {
      // ignore
    }
  }

  const srvExists = fs.existsSync(srvBase);
  const nodeEnvIsProduction = process.env.NODE_ENV === 'production';

  const hasTsx = hasExecutable('tsx');
  const pm2ProcessOnline = isProcessOnline('transcript-library');
  const deployHookServiceActive = isSystemdActive('deploy-hook.service');
  // Check if either service or timer is active for sweep
  const sweepServiceActive = isSystemdActive('transcript-library-sweep.service') || isSystemdActive('transcript-library-sweep.timer');

  const srvDataDir = path.join(srvBase, 'data');
  const optDataDir = path.join(optCurrent, 'data');
  
  // Prefer checking SRV, fallback to OPT if testing locally/poorly configured
  const dataDir = fs.existsSync(srvDataDir) ? srvDataDir : optDataDir;
  
  const lastSourceRefreshExists = fs.existsSync(path.join(dataDir, 'catalog', 'last-source-refresh.json'));
  const lastImportValidationExists = fs.existsSync(path.join(dataDir, 'catalog', 'last-import-validation.json'));
  
  const dailySweepLatestPath = path.join(dataDir, 'runtime', 'daily-operational-sweep', 'latest.json');
  const dailySweepLatestExists = fs.existsSync(dailySweepLatestPath);
  
  let sweepManualFollowUpVideoIds: string[] = [];
  if (dailySweepLatestExists) {
    try {
      const sweepData = JSON.parse(fs.readFileSync(dailySweepLatestPath, 'utf8'));
      if (sweepData.manualFollowUpVideoIds && Array.isArray(sweepData.manualFollowUpVideoIds)) {
        sweepManualFollowUpVideoIds = sweepData.manualFollowUpVideoIds;
      }
    } catch {
      // ignore parsing errors
    }
  }

  // Check analysis persistence
  // Find a video folder in /srv/transcript-library/insights
  let analysisArtifactsInSrv = false;
  let testVideoId: string | undefined;
  
  const srvInsightsDir = path.join(srvBase, 'insights');
  if (fs.existsSync(srvInsightsDir)) {
    const dirs = fs.readdirSync(srvInsightsDir).filter(f => fs.statSync(path.join(srvInsightsDir, f)).isDirectory());
    for (const d of dirs) {
      if (fs.existsSync(path.join(srvInsightsDir, d, 'analysis.json'))) {
        analysisArtifactsInSrv = true;
        testVideoId = d;
        break;
      }
    }
  }

  let analysisArtifactsInOpt = false;
  const optInsightsDir = path.join(optCurrent, 'data', 'insights');
  if (fs.existsSync(optInsightsDir)) {
    const dirs = fs.readdirSync(optInsightsDir).filter(f => fs.statSync(path.join(optInsightsDir, f)).isDirectory());
    for (const d of dirs) {
      if (fs.existsSync(path.join(optInsightsDir, d, 'analysis.json'))) {
        analysisArtifactsInOpt = true;
        break;
      }
    }
  }

  // UAT flag passed via env
  const humanBrowserProofCompleted = process.env.HUMAN_BROWSER_PROOF_COMPLETED === 'true';

  return {
    optCurrentExists,
    optCurrentPointsToRelease,
    srvExists,
    nodeEnvIsProduction,
    hasTsx,
    pm2ProcessOnline,
    deployHookServiceActive,
    sweepServiceActive,
    lastSourceRefreshExists,
    lastImportValidationExists,
    dailySweepLatestExists,
    sweepManualFollowUpVideoIds,
    testVideoId,
    analysisArtifactsInSrv,
    analysisArtifactsInOpt,
    humanBrowserProofCompleted,
  };
}

function getNextInspectionSurface(verdict: HostedLaunchVerdict): string {
  if (verdict.passed) {
    return 'none';
  }

  if (verdict.pendingUat) {
    return '.gsd/milestones/M002/slices/S07/S07-UAT.md';
  }

  switch (verdict.failingPhase) {
    case 'deploy-layout':
      return 'deploy/setup-lxc.sh';
    case 'automation-state':
      return verdict.failingCheckId === 'pm2-online' 
        ? 'pm2 logs transcript-library'
        : 'journalctl -u deploy-hook / transcript-library-sweep';
    case 'refresh-sweep-state':
      return 'data/runtime/daily-operational-sweep/latest.json';
    case 'analysis-persistence':
      return '/srv/transcript-library/insights/';
    default:
      return 'scripts/verify-s07-hosted-launch.ts';
  }
}

function getArtifactPath(verdict: HostedLaunchVerdict): string | undefined {
  if (verdict.failingPhase === 'analysis-persistence') {
    return verdict.failingCheckId === 'analysis-artifacts-not-opt' ? '/opt/transcript-library/current/data/insights/' : '/srv/transcript-library/insights/';
  }
  if (verdict.failingPhase === 'refresh-sweep-state') {
    return '/srv/transcript-library/data/catalog/ /srv/transcript-library/data/runtime/';
  }
  return undefined;
}

function run() {
  const evidence = gatherEvidence();
  const verdict = evaluateHostedLaunchEvidence(evidence);

  const output = {
    passed: verdict.passed,
    pendingUat: verdict.pendingUat,
    failingPhase: verdict.failingPhase,
    failingCheckId: verdict.failingCheckId,
    testVideoId: verdict.testVideoId,
    manualFollowUpVideoIds: verdict.manualFollowUpVideoIds,
    artifactPath: getArtifactPath(verdict),
    nextInspectionSurface: getNextInspectionSurface(verdict),
    checks: verdict.checks.filter(c => !c.passed),
  };

  console.log(JSON.stringify(output, null, 2));

  if (!verdict.passed && !verdict.pendingUat) {
    process.exit(1);
  }
}

if (import.meta.url.startsWith('file:') && process.argv[1] === new URL(import.meta.url).pathname) {
  run();
}
