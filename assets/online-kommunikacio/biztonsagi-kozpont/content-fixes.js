(() => {
  const cases = window.SAFETY_CASES || [];
  const bullying = cases.find(item => item.id === 'bullying');
  if (!bullying) return;

  const firstVideo = bullying.videos?.[0];
  const firstQuestion = firstVideo?.questions?.[0];
  if (firstQuestion) {
    firstQuestion.question = 'Miért nem tudtak aludni a szereplők?';
    firstQuestion.options = [
      { id: 'messages', label: 'Folyamatosan üzeneteket kaptak a telefonjaikra.', correct: true },
      { id: 'storm', label: 'Vihar és mennydörgés volt odakint.', correct: false },
      { id: 'animals', label: 'A nyáj állatai egész éjjel zajongtak.', correct: false },
      { id: 'music', label: 'Valaki hangosan zenét hallgatott.', correct: false }
    ];
    firstQuestion.success = 'A telefonokra folyamatosan érkező üzenetek még éjszaka sem hagyták pihenni a szereplőket.';
    firstQuestion.help = 'Figyeld meg, mi zavarta meg újra és újra az éjszakai nyugalmat.';
  }

  const secondVideo = bullying.videos?.[1];
  if (secondVideo) {
    secondVideo.id = 'marti-story';
    secondVideo.title = 'Márti története';
    secondVideo.prompt = 'Figyeld meg, ki bántotta Mártit az interneten, és hogyan sikerült végül segítséget kapnia!';

    (secondVideo.questions || []).forEach(question => {
      question.question = question.question
        .replaceAll('Mátiról', 'Mártiról')
        .replaceAll('Mátinak', 'Mártinak')
        .replaceAll('Mátit', 'Mártit')
        .replaceAll('Máti', 'Márti');
      question.success = question.success
        .replaceAll('Mátiról', 'Mártiról')
        .replaceAll('Mátinak', 'Mártinak')
        .replaceAll('Mátit', 'Mártit')
        .replaceAll('Máti', 'Márti');
      question.help = question.help
        .replaceAll('Mátiról', 'Mártiról')
        .replaceAll('Mátinak', 'Mártinak')
        .replaceAll('Mátit', 'Mártit')
        .replaceAll('Máti', 'Márti');
    });
  }
})();
