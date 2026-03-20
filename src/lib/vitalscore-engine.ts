export function calculateVitalScore(answers: Record<string, { freq: number; agr: number }>) {
  const getComp = (id: string) => (answers[id]?.freq || 0) * 0.7 + (answers[id]?.agr || 0) * 0.3
  const getFreq = (id: string) => answers[id]?.freq || 0
  const getAgr = (id: string) => answers[id]?.agr || 0

  const sumBlock = (start: number, end: number) => {
    let sum = 0
    let agrSum = 0
    for (let i = start; i <= end; i++) {
      sum += getComp(`q${i}`)
      agrSum += getAgr(`q${i}`)
    }
    const count = end - start + 1
    return { comp: sum / count, agr: agrSum / count }
  }

  const blockA = sumBlock(1, 6)
  const blockB = sumBlock(7, 12)
  const blockC = sumBlock(13, 20)
  const blockD = sumBlock(21, 26)
  const blockE = sumBlock(27, 32)
  const blockF = sumBlock(33, 38)
  const blockG = sumBlock(39, 43)

  let sriSum = 0
  let sentinelCompSum = 0
  for (let i = 44; i <= 48; i++) {
    const f = getFreq(`q${i}`)
    const a = getAgr(`q${i}`)
    const comp = f * 0.7 + a * 0.3
    sentinelCompSum += comp
    const mult = f === 3 ? 2.0 : f === 2 ? 1.5 : 1.0
    sriSum += comp * mult
  }
  const SRI = sriSum / 5

  const NFLI =
    (blockA.comp * 1.2 +
      blockB.comp * 1.0 +
      blockC.comp * 1.2 +
      blockD.comp * 1.0 +
      blockE.comp * 1.2 +
      blockF.comp * 0.9) /
    6.5

  const DVI = (blockA.agr + blockB.agr + blockC.agr + blockD.agr + blockE.agr + blockF.agr) / 6
  const FII = blockG.comp

  let rawScore = 100 - (NFLI * 20 + DVI * 15 + FII * 10 + SRI * 12)
  rawScore = Math.max(0, Math.min(100, Math.round(rawScore)))

  let alert: 'Green' | 'Yellow' | 'Orange' | 'Red' = 'Green'
  const hasSentinelAgr3 = [44, 45, 46, 47, 48].some((i) => getAgr(`q${i}`) === 3)

  if (
    getFreq('q45') >= 2 ||
    getComp('q44') >= 2 ||
    getComp('q48') >= 2 ||
    sentinelCompSum >= 8 ||
    hasSentinelAgr3
  ) {
    alert = 'Red'
  } else {
    const domains = [blockA.comp, blockB.comp, blockC.comp, blockD.comp, blockE.comp, blockF.comp]
    const domainsOver2 = domains.filter((d) => d >= 2.0).length
    const domainsOver1_5 = domains.filter((d) => d >= 1.5).length

    if (domainsOver2 > 0 || domainsOver1_5 >= 2 || FII >= 2.0) {
      alert = 'Orange'
    } else if (domains.some((d) => d >= 1.25) || DVI >= 1.25 || FII >= 1.0) {
      alert = 'Yellow'
    }
  }

  const recommendations: string[] = []
  if (blockC.comp >= 1.5) {
    recommendations.push(
      'Sugerir rastreio neuropsicológico aprofundado e atenção para sono, TDAH, estresse, burnout, medicações.',
    )
  }
  if (blockA.comp >= 1.5) {
    recommendations.push(
      'Sugerir investigação de ansiedade, trauma, ameaça sustentada, hipervigilância.',
    )
  }
  if (blockB.comp >= 1.5) {
    recommendations.push('Sugerir investigação de anedonia, apatia, exaustão, reward deficiency.')
  }
  if (blockE.comp >= 1.5) {
    recommendations.push(
      'Sugerir revisão de sono, ritmicidade, estado autonômico, inflamação, dor.',
    )
  }
  if (blockF.comp >= 1.5) {
    recommendations.push(
      'Sugerir investigação de integração sensorial, agitação, desacoplamento corpo-ação.',
    )
  }

  return {
    score: rawScore,
    alert,
    nfli: NFLI,
    dvi: DVI,
    fii: FII,
    sri: SRI,
    domains: {
      A: blockA.comp,
      B: blockB.comp,
      C: blockC.comp,
      D: blockD.comp,
      E: blockE.comp,
      F: blockF.comp,
    },
    recommendations,
  }
}
