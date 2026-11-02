/**
 * 경기예술인의집 나들이 프로그램 · 김윤신 작가 나들이 참가 신청 구글폼 자동 생성
 *
 * 사용법
 * 1) https://script.google.com 접속 → [새 프로젝트]
 * 2) 이 파일 내용을 전부 붙여 넣고 저장
 * 3) 위쪽 함수 선택에서 createOutingForm 선택 → [실행] → 구글 계정 권한 허용
 * 4) [실행 로그]에 나온 "응답 링크"를 poster.html 의 FORM_URL 에 넣으면 포스터 QR이 생성됩니다.
 *    응답은 함께 만들어지는 구글 시트에 자동으로 쌓입니다.
 */
function createOutingForm() {
  const form = FormApp.create('[경기예술인의집 나들이] 김윤신 작가 나들이 참가 신청');

  form.setDescription([
    '조각가 김윤신 작가의 작업 세계를 만나는 경기예술인의집 나들이 프로그램입니다.',
    '',
    '■ 일시: 2026년 11월 26일(목) 오후 1시 ~ 2시',
    '■ 장소: 경기도 파주시 문발로 123',
    '■ 신청 마감: 11월 20일(금) · 선착순',
    '',
    '신청해 주신 분께는 확정 안내를 문자로 드립니다.'
  ].join('\n'));
  form.setConfirmationMessage('신청이 접수되었습니다. 11월 26일(목) 오후 1시, 파주 문발로 123에서 뵙겠습니다. 감사합니다!');
  form.setCollectEmail(false);
  form.setAllowResponseEdits(true);
  form.setProgressBar(false);

  form.addTextItem().setTitle('성함').setRequired(true);

  const phone = FormApp.createTextValidation()
    .requireTextMatchesPattern('^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$')
    .setHelpText('010-0000-0000 형식으로 입력해 주세요.')
    .build();
  form.addTextItem().setTitle('연락처 (휴대전화)').setValidation(phone).setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('활동 분야')
    .setChoiceValues(['미술', '공예', '사진·영상', '문학', '음악', '공연·무용'])
    .showOtherOption(true)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('참가 인원 (본인 포함)')
    .setChoiceValues(['1명', '2명', '3명'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('오시는 방법')
    .setChoiceValues(['자차로 이동', '대중교통', '카풀 희망 (태워 주실 분 / 타고 싶은 분 문의란에 적어 주세요)'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('김윤신 작가님께 드리고 싶은 질문이나 문의사항')
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('개인정보 수집·이용 동의')
    .setHelpText('수집 항목: 성함, 연락처, 활동 분야 / 이용 목적: 나들이 참가 확인 및 안내 / 보유 기간: 프로그램 종료 후 1개월 내 파기')
    .setChoiceValues(['동의합니다'])
    .setRequired(true);

  const sheet = SpreadsheetApp.create('김윤신 작가 나들이 신청 응답');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('응답 링크(포스터·홍보용): ' + form.getPublishedUrl());
  Logger.log('폼 편집 링크: ' + form.getEditUrl());
  Logger.log('응답 시트: ' + sheet.getUrl());
}
