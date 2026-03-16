import { describe, it, expect } from 'vitest';
import { evaluateHostedLaunchEvidence, HostedLaunchEvidence } from '../hosted-launch-proof';

describe('evaluateHostedLaunchEvidence', () => {
  const baseEvidence: HostedLaunchEvidence = {
    optCurrentExists: true,
    optCurrentPointsToRelease: true,
    srvExists: true,
    nodeEnvIsProduction: true,
    hasTsx: true,
    pm2ProcessOnline: true,
    deployHookServiceActive: true,
    sweepServiceActive: true,
    lastSourceRefreshExists: true,
    lastImportValidationExists: true,
    dailySweepLatestExists: true,
    sweepManualFollowUpVideoIds: [],
    testVideoId: 'video-123',
    analysisArtifactsInSrv: true,
    analysisArtifactsInOpt: false,
    humanBrowserProofCompleted: true,
  };

  it('passes fully passing hosted proof record', () => {
    const verdict = evaluateHostedLaunchEvidence(baseEvidence);
    expect(verdict.passed).toBe(true);
    expect(verdict.pendingUat).toBe(false);
    expect(verdict.failingCheckId).toBeUndefined();
    expect(verdict.failingPhase).toBeUndefined();
  });

  it('fails with missing tsx', () => {
    const evidence = { ...baseEvidence, hasTsx: false };
    const verdict = evaluateHostedLaunchEvidence(evidence);
    expect(verdict.passed).toBe(false);
    expect(verdict.failingPhase).toBe('automation-state');
    expect(verdict.failingCheckId).toBe('has-tsx');
  });

  it('fails with missing refresh evidence', () => {
    const evidence = { ...baseEvidence, lastSourceRefreshExists: false };
    const verdict = evaluateHostedLaunchEvidence(evidence);
    expect(verdict.passed).toBe(false);
    expect(verdict.failingPhase).toBe('refresh-sweep-state');
    expect(verdict.failingCheckId).toBe('last-source-refresh');
  });

  it('fails with analysis artifacts written under /opt/transcript-library/current', () => {
    const evidence = { ...baseEvidence, analysisArtifactsInOpt: true };
    const verdict = evaluateHostedLaunchEvidence(evidence);
    expect(verdict.passed).toBe(false);
    expect(verdict.failingPhase).toBe('analysis-persistence');
    expect(verdict.failingCheckId).toBe('analysis-artifacts-not-opt');
  });

  it('fails with unresolved manualFollowUpVideoIds', () => {
    const evidence = { ...baseEvidence, sweepManualFollowUpVideoIds: ['video-456'] };
    const verdict = evaluateHostedLaunchEvidence(evidence);
    expect(verdict.passed).toBe(false);
    expect(verdict.failingPhase).toBe('refresh-sweep-state');
    expect(verdict.failingCheckId).toBe('sweep-unresolved-drift');
  });

  it('returns pendingUat when human browser proof is pending', () => {
    const evidence = { ...baseEvidence, humanBrowserProofCompleted: false };
    const verdict = evaluateHostedLaunchEvidence(evidence);
    expect(verdict.passed).toBe(false);
    expect(verdict.pendingUat).toBe(true);
    expect(verdict.failingPhase).toBe('browser-uat');
    expect(verdict.failingCheckId).toBe('human-browser-proof');
  });

  it('does not return pendingUat if machine checks fail', () => {
    const evidence = { ...baseEvidence, hasTsx: false, humanBrowserProofCompleted: false };
    const verdict = evaluateHostedLaunchEvidence(evidence);
    expect(verdict.passed).toBe(false);
    expect(verdict.pendingUat).toBe(false); // since machine checks failed
    expect(verdict.failingPhase).toBe('automation-state'); // should flag the machine check first
    expect(verdict.failingCheckId).toBe('has-tsx');
  });
});
