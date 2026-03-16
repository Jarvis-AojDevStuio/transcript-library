export type HostedLaunchPhase = 
  | 'deploy-layout'
  | 'automation-state'
  | 'refresh-sweep-state'
  | 'analysis-persistence'
  | 'browser-uat';

export interface HostedLaunchEvidence {
  // Deploy layout
  optCurrentExists: boolean;
  optCurrentPointsToRelease: boolean;
  srvExists: boolean;
  nodeEnvIsProduction: boolean;

  // Automation state
  hasTsx: boolean;
  pm2ProcessOnline: boolean;
  deployHookServiceActive: boolean;
  sweepServiceActive: boolean;

  // Refresh/sweep state
  lastSourceRefreshExists: boolean;
  lastImportValidationExists: boolean;
  dailySweepLatestExists: boolean;
  sweepManualFollowUpVideoIds: string[];

  // Analysis persistence
  testVideoId?: string;
  analysisArtifactsInSrv: boolean;
  analysisArtifactsInOpt: boolean; // should be false

  // Browser/UAT
  humanBrowserProofCompleted: boolean;
}

export interface HostedLaunchCheck {
  id: string;
  phase: HostedLaunchPhase;
  passed: boolean;
  reason?: string;
}

export interface HostedLaunchVerdict {
  passed: boolean;
  pendingUat: boolean;
  failingPhase?: HostedLaunchPhase;
  failingCheckId?: string;
  checks: HostedLaunchCheck[];
  testVideoId?: string;
  manualFollowUpVideoIds: string[];
}

export function evaluateHostedLaunchEvidence(evidence: HostedLaunchEvidence): HostedLaunchVerdict {
  const checks: HostedLaunchCheck[] = [];
  
  // Deploy Layout
  checks.push({
    id: 'opt-current-exists',
    phase: 'deploy-layout',
    passed: evidence.optCurrentExists,
    reason: evidence.optCurrentExists ? undefined : '/opt/transcript-library/current does not exist',
  });
  checks.push({
    id: 'opt-current-symlink',
    phase: 'deploy-layout',
    passed: evidence.optCurrentPointsToRelease,
    reason: evidence.optCurrentPointsToRelease ? undefined : '/opt/transcript-library/current is not a symlink to a release',
  });
  checks.push({
    id: 'srv-exists',
    phase: 'deploy-layout',
    passed: evidence.srvExists,
    reason: evidence.srvExists ? undefined : '/srv/transcript-library does not exist',
  });
  checks.push({
    id: 'node-env-production',
    phase: 'deploy-layout',
    passed: evidence.nodeEnvIsProduction,
    reason: evidence.nodeEnvIsProduction ? undefined : 'NODE_ENV is not production',
  });

  // Automation state
  checks.push({
    id: 'has-tsx',
    phase: 'automation-state',
    passed: evidence.hasTsx,
    reason: evidence.hasTsx ? undefined : 'tsx executable not found in PATH or project',
  });
  checks.push({
    id: 'pm2-online',
    phase: 'automation-state',
    passed: evidence.pm2ProcessOnline,
    reason: evidence.pm2ProcessOnline ? undefined : 'pm2 transcript-library process is not online',
  });
  checks.push({
    id: 'deploy-hook-active',
    phase: 'automation-state',
    passed: evidence.deployHookServiceActive,
    reason: evidence.deployHookServiceActive ? undefined : 'deploy-hook systemd service is not active',
  });
  checks.push({
    id: 'sweep-service-active',
    phase: 'automation-state',
    passed: evidence.sweepServiceActive,
    reason: evidence.sweepServiceActive ? undefined : 'transcript-library-sweep systemd service/timer is not active',
  });

  // Refresh/sweep state
  checks.push({
    id: 'last-source-refresh',
    phase: 'refresh-sweep-state',
    passed: evidence.lastSourceRefreshExists,
    reason: evidence.lastSourceRefreshExists ? undefined : 'last-source-refresh.json not found',
  });
  checks.push({
    id: 'last-import-validation',
    phase: 'refresh-sweep-state',
    passed: evidence.lastImportValidationExists,
    reason: evidence.lastImportValidationExists ? undefined : 'last-import-validation.json not found',
  });
  checks.push({
    id: 'daily-sweep-latest',
    phase: 'refresh-sweep-state',
    passed: evidence.dailySweepLatestExists,
    reason: evidence.dailySweepLatestExists ? undefined : 'daily-operational-sweep/latest.json not found',
  });
  checks.push({
    id: 'sweep-unresolved-drift',
    phase: 'refresh-sweep-state',
    passed: evidence.sweepManualFollowUpVideoIds.length === 0,
    reason: evidence.sweepManualFollowUpVideoIds.length === 0 ? undefined : `Unresolved drift: manualFollowUpVideoIds contains ${evidence.sweepManualFollowUpVideoIds.length} items`,
  });

  // Analysis persistence
  checks.push({
    id: 'analysis-artifacts-srv',
    phase: 'analysis-persistence',
    passed: evidence.analysisArtifactsInSrv,
    reason: evidence.analysisArtifactsInSrv ? undefined : 'Analysis artifacts not found in /srv/transcript-library/insights',
  });
  checks.push({
    id: 'analysis-artifacts-not-opt',
    phase: 'analysis-persistence',
    passed: !evidence.analysisArtifactsInOpt,
    reason: !evidence.analysisArtifactsInOpt ? undefined : 'Analysis artifacts mistakenly written to /opt/transcript-library/current',
  });

  // Browser/UAT
  checks.push({
    id: 'human-browser-proof',
    phase: 'browser-uat',
    passed: evidence.humanBrowserProofCompleted,
    reason: evidence.humanBrowserProofCompleted ? undefined : 'Human browser UAT proof is pending',
  });

  const failingCheck = checks.find(c => !c.passed);
  
  // A missing human-browser-proof doesn't mean the machine check fails, but the overall readiness is pending
  // We can treat it as a failure for the full S07 proof, but specifically flag it as pendingUat.
  // Wait, the plan says: "pending browser/UAT proof" should be an explicit verdict.
  // We will say the full verdict passed = true ONLY if all checks passed.
  // If the ONLY failing check is human-browser-proof, passed = false, but pendingUat = true.
  
  const machineChecksPassed = checks.filter(c => c.id !== 'human-browser-proof').every(c => c.passed);
  const allChecksPassed = checks.every(c => c.passed);

  return {
    passed: allChecksPassed,
    pendingUat: machineChecksPassed && !evidence.humanBrowserProofCompleted,
    failingPhase: failingCheck?.phase,
    failingCheckId: failingCheck?.id,
    checks,
    testVideoId: evidence.testVideoId,
    manualFollowUpVideoIds: evidence.sweepManualFollowUpVideoIds,
  };
}
