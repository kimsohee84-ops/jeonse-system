<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>전세피해자 소송구조 회계시스템</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --navy:#1F4E79;--blue:#2E75B6;--teal:#0F6E56;--white:#fff;
  --bg:#F5F7FA;--surface:#fff;--border:#E2E8F0;
  --text:#1A202C;--muted:#64748B;--light:#F8FAFC;
  --green-bg:#E6F9F0;--green-txt:#0F6E56;
  --amber-bg:#FEF3C7;--amber-txt:#92400E;
  --red-bg:#FEE2E2;--red-txt:#991B1B;
  --blue-bg:#EFF6FF;--blue-txt:#1D4ED8;
  --radius:10px;--radius-lg:14px;
  --shadow:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.06);
  --shadow-md:0 4px 6px rgba(0,0,0,.07),0 2px 4px rgba(0,0,0,.06);
}
body{font-family:'Noto Sans KR',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
.mono{font-family:'IBM Plex Mono',monospace}

/* ── 로그인 ── */
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem}
.login-card{background:var(--surface);border-radius:var(--radius-lg);padding:2.5rem;width:100%;max-width:400px;box-shadow:var(--shadow-md);border:1px solid var(--border)}
.login-logo{text-align:center;margin-bottom:2rem}
.login-logo-icon{width:52px;height:52px;background:var(--navy);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:22px;margin-bottom:.75rem}
.login-logo h1{font-size:17px;font-weight:600;color:var(--navy)}
.login-logo p{font-size:13px;color:var(--muted);margin-top:3px}
.form-group{margin-bottom:1rem}
.form-label{display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:5px}
.form-input{width:100%;padding:9px 12px;border:1px solid var(--border);border-radius:var(--radius);font-size:14px;font-family:'Noto Sans KR',sans-serif;outline:none;transition:border-color .15s;color:var(--text);background:var(--surface)}
.form-input:focus{border-color:var(--blue)}
.btn-login{width:100%;padding:10px;background:var(--navy);color:#fff;border:none;border-radius:var(--radius);font-size:14px;font-weight:600;font-family:'Noto Sans KR',sans-serif;cursor:pointer;margin-top:.5rem;transition:background .15s}
.btn-login:hover{background:var(--blue)}
.login-error{font-size:12px;color:#DC2626;margin-top:.5rem;text-align:center;display:none}
.login-hint{font-size:11px;color:var(--muted);text-align:center;margin-top:1rem}

/* ── 앱 레이아웃 ── */
.app{display:none;min-height:100vh;flex-direction:column}
.app.visible{display:flex}
.topnav{background:var(--navy);color:#fff;padding:0 1.5rem;height:54px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.topnav-left{display:flex;align-items:center;gap:12px}
.topnav-logo{font-size:15px;font-weight:600}
.topnav-sub{font-size:11px;opacity:.7}
.topnav-right{display:flex;align-items:center;gap:10px;font-size:13px}
.user-badge{background:rgba(255,255,255,.15);padding:4px 10px;border-radius:20px;font-size:12px}
.btn-logout{background:transparent;border:1px solid rgba(255,255,255,.3);color:#fff;padding:4px 10px;border-radius:var(--radius);font-size:12px;cursor:pointer;font-family:'Noto Sans KR',sans-serif}
.btn-logout:hover{background:rgba(255,255,255,.1)}
.sidenav-main{display:flex;flex:1;overflow:hidden}
.sidenav{width:200px;background:var(--surface);border-right:1px solid var(--border);padding:1rem 0;flex-shrink:0}
.nav-section-label{font-size:10px;font-weight:600;color:var(--muted);padding:8px 16px 4px;letter-spacing:.06em;text-transform:uppercase}
.nav-item{display:flex;align-items:center;gap:8px;padding:8px 16px;font-size:13px;color:var(--muted);cursor:pointer;border-left:3px solid transparent;transition:all .12s}
.nav-item:hover{background:var(--light);color:var(--text)}
.nav-item.active{background:#EBF3FC;color:var(--navy);font-weight:500;border-left-color:var(--navy)}
.nav-item i{font-size:16px}
.main-content{flex:1;overflow-y:auto;padding:1.5rem}

/* ── 뷰 ── */
.view{display:none}
.view.active{display:block}
.page-title{font-size:18px;font-weight:600;color:var(--navy);margin-bottom:4px}
.page-sub{font-size:13px;color:var(--muted);margin-bottom:1.5rem}

/* ── 카드 ── */
.card{background:var(--surface);border-radius:var(--radius-lg);border:1px solid var(--border);padding:1.25rem;box-shadow:var(--shadow)}
.card-title{font-size:14px;font-weight:600;color:var(--text);margin-bottom:1rem;display:flex;align-items:center;gap:6px}
.card-title i{font-size:16px;color:var(--navy)}

/* ── 배지 ── */
.badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap}
.badge-green{background:var(--green-bg);color:var(--green-txt)}
.badge-amber{background:var(--amber-bg);color:var(--amber-txt)}
.badge-red{background:var(--red-bg);color:var(--red-txt)}
.badge-blue{background:var(--blue-bg);color:var(--blue-txt)}
.badge-navy{background:#EBF3FC;color:var(--navy)}

/* ── 버튼 ── */
.btn{padding:7px 14px;border-radius:var(--radius);font-size:13px;font-weight:500;font-family:'Noto Sans KR',sans-serif;border:1px solid var(--border);background:var(--surface);color:var(--text);cursor:pointer;display:inline-flex;align-items:center;gap:5px;transition:all .12s}
.btn:hover{background:var(--light)}
.btn-primary{background:var(--navy);color:#fff;border-color:var(--navy)}
.btn-primary:hover{background:var(--blue)}
.btn-success{background:var(--teal);color:#fff;border-color:var(--teal)}
.btn-sm{padding:4px 10px;font-size:12px}

/* ── 업로드 영역 ── */
.upload-zone{border:2px dashed var(--border);border-radius:var(--radius-lg);padding:2.5rem;text-align:center;cursor:pointer;transition:all .15s;background:var(--light)}
.upload-zone:hover,.upload-zone.dragover{border-color:var(--blue);background:#EFF6FF}
.upload-zone i{font-size:40px;color:var(--muted);margin-bottom:.75rem;display:block}
.upload-zone h3{font-size:15px;font-weight:500;margin-bottom:.5rem;color:var(--text)}
.upload-zone p{font-size:12px;color:var(--muted)}
#file-input{display:none}

/* ── 파싱 결과 ── */
.parse-result{display:none;margin-top:1.5rem}
.parse-header{display:flex;align-items:center;gap:8px;margin-bottom:1rem}
.parse-status{font-size:13px;font-weight:500}
.field-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:1rem}
.field-item{background:var(--light);border-radius:var(--radius);padding:10px 12px;border:1px solid var(--border)}
.field-label{font-size:11px;color:var(--muted);margin-bottom:3px}
.field-value{font-size:13px;font-weight:500;color:var(--text)}
.field-value.editable{background:#fff;border:1px solid var(--border);border-radius:6px;padding:4px 8px;width:100%;font-family:'Noto Sans KR',sans-serif;font-size:13px;outline:none}
.field-value.editable:focus{border-color:var(--blue)}

/* ── 지출결의서 미리보기 ── */
.resol-preview{background:#fff;border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;margin-top:1.5rem;display:none}
.resol-header{background:var(--navy);color:#fff;padding:12px 16px;display:flex;align-items:center;justify-content:space-between}
.resol-header h3{font-size:14px;font-weight:600}
.resol-body{padding:1.25rem}
.resol-title{text-align:center;font-size:18px;font-weight:600;color:var(--navy);margin-bottom:4px;letter-spacing:.05em}
.resol-sub{text-align:center;font-size:12px;color:var(--muted);margin-bottom:1.25rem}
.resol-meta{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:1rem}
.resol-meta-item{font-size:12px;display:flex;gap:6px}
.resol-meta-label{color:var(--muted);min-width:72px;font-weight:500}
.resol-meta-value{color:var(--text)}
.approval-row{display:flex;gap:8px;margin-bottom:1.25rem}
.approval-box{flex:1;border:1px solid var(--border);border-radius:var(--radius);padding:8px;text-align:center}
.approval-role{font-size:10px;color:var(--muted);margin-bottom:4px}
.approval-name{font-size:12px;font-weight:500;color:var(--text)}
.approval-stamp{font-size:10px;margin-top:4px}
.stamp-done{color:var(--green-txt)}
.stamp-wait{color:var(--muted)}
.resol-table{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:1rem}
.resol-table th{background:#F0F4F8;padding:7px 8px;text-align:center;font-weight:600;color:var(--navy);border:1px solid var(--border)}
.resol-table td{padding:7px 8px;border:1px solid var(--border);color:var(--text)}
.resol-table tr:nth-child(even) td{background:var(--light)}
.resol-total{display:flex;justify-content:flex-end;gap:16px;font-size:13px;font-weight:600;padding:8px 0;border-top:2px solid var(--navy);color:var(--navy)}

/* ── 목록 테이블 ── */
.list-table{width:100%;border-collapse:collapse;font-size:12px}
.list-table th{background:#F0F4F8;padding:8px 10px;text-align:left;font-weight:600;color:var(--navy);border-bottom:2px solid var(--border)}
.list-table td{padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:middle}
.list-table tr:hover td{background:var(--light)}
.list-table tr.row-green td{background:#F0FDF4}
.list-table tr.row-amber td{background:#FFFBEB}
.list-table tr.row-red td{background:#FFF5F5}

/* ── 통계 카드 ── */
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:1.5rem}
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1rem 1.25rem;box-shadow:var(--shadow)}
.stat-val{font-size:22px;font-weight:600;color:var(--navy);margin-bottom:3px}
.stat-label{font-size:12px;color:var(--muted)}

/* ── 스피너 ── */
.spinner{display:inline-block;width:18px;height:18px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-bar{height:3px;background:var(--light);border-radius:2px;overflow:hidden;margin:1rem 0;display:none}
.loading-bar-fill{height:100%;background:var(--blue);border-radius:2px;animation:load 1.8s ease-in-out infinite}
@keyframes load{0%{width:0;margin-left:0}50%{width:60%;margin-left:20%}100%{width:0;margin-left:100%}}
.loading-text{font-size:13px;color:var(--muted);text-align:center;display:none}

/* ── 토스트 ── */
.toast{position:fixed;bottom:24px;right:24px;background:var(--navy);color:#fff;padding:10px 16px;border-radius:var(--radius);font-size:13px;font-weight:500;box-shadow:var(--shadow-md);transform:translateY(80px);opacity:0;transition:all .25s;z-index:9999;display:flex;align-items:center;gap:8px}
.toast.show{transform:translateY(0);opacity:1}

/* ── 2열 그리드 ── */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}

/* ── 진행 단계 ── */
.step-bar{display:flex;align-items:center;gap:0;margin-bottom:1.5rem}
.step-item{flex:1;text-align:center;font-size:11px;padding:7px 4px;color:var(--muted);border-bottom:2px solid var(--border);position:relative}
.step-item.done{color:var(--green-txt);border-color:var(--teal)}
.step-item.cur{color:var(--navy);border-color:var(--navy);font-weight:600}

/* ── 반응형 ── */
@media(max-width:640px){
  .stat-grid{grid-template-columns:1fr 1fr}
  .field-grid{grid-template-columns:1fr}
  .sidenav{display:none}
}
</style>
</head>
<body>

<!-- ══ 로그인 ══ -->
<div class="login-wrap" id="login-screen">
  <div class="login-card">
    <div class="login-logo">
      <div class="login-logo-icon"><i class="ti ti-scale" aria-hidden="true"></i></div>
      <h1>법률구조재단</h1>
      <p>전세피해자 소송구조 회계시스템</p>
    </div>
    <div class="form-group">
      <label class="form-label">아이디</label>
      <input class="form-input" type="text" id="login-id" placeholder="아이디를 입력하세요" autocomplete="username">
    </div>
    <div class="form-group">
      <label class="form-label">비밀번호</label>
      <input class="form-input" type="password" id="login-pw" placeholder="비밀번호를 입력하세요" autocomplete="current-password">
    </div>
    <p class="login-error" id="login-error"><i class="ti ti-alert-circle" aria-hidden="true"></i> 아이디 또는 비밀번호가 올바르지 않습니다</p>
    <button class="btn-login" id="btn-login" onclick="doLogin()">로그인</button>
    <p class="login-hint">테스트 계정: admin / 1234 &nbsp;|&nbsp; user1 / 1234 &nbsp;|&nbsp; finance / 1234</p>
  </div>
</div>

<!-- ══ 앱 ══ -->
<div class="app" id="app">
  <nav class="topnav">
    <div class="topnav-left">
      <i class="ti ti-scale" style="font-size:20px" aria-hidden="true"></i>
      <div>
        <div class="topnav-logo">전세피해자 소송구조 회계시스템</div>
        <div class="topnav-sub">국토부 2026년 사업</div>
      </div>
    </div>
    <div class="topnav-right">
      <span class="user-badge" id="user-badge"></span>
      <button class="btn-logout" onclick="doLogout()"><i class="ti ti-logout" aria-hidden="true"></i> 로그아웃</button>
    </div>
  </nav>

  <div class="sidenav-main">
    <aside class="sidenav">
      <div class="nav-section-label">업무</div>
      <div class="nav-item active" onclick="showView('dashboard')"><i class="ti ti-layout-dashboard" aria-hidden="true"></i> 대시보드</div>
      <div class="nav-item" onclick="showView('upload')"><i class="ti ti-upload" aria-hidden="true"></i> 청구서 업로드</div>
      <div class="nav-item" onclick="showView('resol')"><i class="ti ti-clipboard-list" aria-hidden="true"></i> 지출결의서</div>
      <div class="nav-item" onclick="showView('list')"><i class="ti ti-list" aria-hidden="true"></i> 지출 목록</div>
      <div class="nav-section-label" style="margin-top:8px">회계</div>
      <div class="nav-item" onclick="showView('account')"><i class="ti ti-chart-bar" aria-hidden="true"></i> 집행 현황</div>
      <div class="nav-item" onclick="showView('lawyer')"><i class="ti ti-user-check" aria-hidden="true"></i> 변호사 계좌</div>
    </aside>

    <main class="main-content">

      <!-- 대시보드 -->
      <div class="view active" id="view-dashboard">
        <p class="page-title">대시보드</p>
        <p class="page-sub">2026년 5월 · 전세피해자 소송구조 (국토부)</p>
        <div class="stat-grid">
          <div class="stat-card"><div class="stat-val">28</div><div class="stat-label">전체 사건</div></div>
          <div class="stat-card"><div class="stat-val" style="color:var(--green-txt)">18</div><div class="stat-label">계산서 수령완료</div></div>
          <div class="stat-card"><div class="stat-val" style="color:#B45309">10</div><div class="stat-label">계산서 미수령</div></div>
          <div class="stat-card"><div class="stat-val">28,480,000</div><div class="stat-label">이달 지급예정 (원)</div></div>
        </div>
        <div class="grid-2" style="margin-bottom:1rem">
          <div class="card">
            <div class="card-title"><i class="ti ti-alert-triangle" aria-hidden="true"></i> 처리 필요 항목</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:var(--amber-bg);border-radius:var(--radius);font-size:13px">
                <span style="color:var(--amber-txt);font-weight:500"><i class="ti ti-file-alert" aria-hidden="true"></i> 계산서 미수령</span>
                <span class="badge badge-amber">10건</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:var(--blue-bg);border-radius:var(--radius);font-size:13px">
                <span style="color:var(--blue-txt);font-weight:500"><i class="ti ti-clipboard" aria-hidden="true"></i> 결의서 작성 대기</span>
                <span class="badge badge-blue">5건</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:var(--green-bg);border-radius:var(--radius);font-size:13px">
                <span style="color:var(--green-txt);font-weight:500"><i class="ti ti-circle-check" aria-hidden="true"></i> 입금 준비 완료</span>
                <span class="badge badge-green">13건</span>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-title"><i class="ti ti-chart-pie" aria-hidden="true"></i> 예산 집행 현황</div>
            <div style="font-size:12px;color:var(--muted);margin-bottom:6px">사업비 배정액</div>
            <div style="font-size:20px;font-weight:600;color:var(--navy);margin-bottom:10px">432,000,000 원</div>
            <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:5px">
              <span>기집행: 112,580,000원</span><span>집행률 26%</span>
            </div>
            <div style="height:8px;background:var(--light);border-radius:4px;overflow:hidden;margin-bottom:8px">
              <div style="height:100%;width:26%;background:var(--navy);border-radius:4px"></div>
            </div>
            <div style="font-size:12px;color:var(--muted)">잔액: <strong style="color:var(--text)">319,420,000 원</strong></div>
          </div>
        </div>
        <div class="card">
          <div class="card-title"><i class="ti ti-clock" aria-hidden="true"></i> 최근 처리 내역</div>
          <table class="list-table">
            <thead><tr><th>접수번호</th><th>변호사</th><th>의뢰인</th><th>금액</th><th>상태</th><th>처리일</th></tr></thead>
            <tbody>
              <tr class="row-green"><td class="mono" style="font-size:11px">국부 26-110</td><td>권우상</td><td>강은지</td><td class="mono">100,000</td><td><span class="badge badge-green">계산서수령</span></td><td style="color:var(--muted);font-size:11px">2026-04-22</td></tr>
              <tr class="row-green"><td class="mono" style="font-size:11px">국부 26-154</td><td>김동창</td><td>신서영</td><td class="mono">500,000</td><td><span class="badge badge-green">계산서수령</span></td><td style="color:var(--muted);font-size:11px">2026-04-28</td></tr>
              <tr class="row-amber"><td class="mono" style="font-size:11px">국부 26-153</td><td>김동창</td><td>안가람</td><td class="mono">1,000,000</td><td><span class="badge badge-amber">미수령</span></td><td style="color:var(--muted);font-size:11px">2026-05-02</td></tr>
              <tr class="row-amber"><td class="mono" style="font-size:11px">국부 26-105</td><td>김명철</td><td>이예나</td><td class="mono">500,000</td><td><span class="badge badge-amber">미수령</span></td><td style="color:var(--muted);font-size:11px">2026-04-15</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 청구서 업로드 -->
      <div class="view" id="view-upload">
        <p class="page-title">비용청구서 업로드</p>
        <p class="page-sub">청구서 PDF를 업로드하면 AI가 자동으로 내용을 읽어 지출결의서를 작성합니다</p>

        <div class="step-bar">
          <div class="step-item cur" id="step1">① 파일 업로드</div>
          <div class="step-item" id="step2">② AI 분석</div>
          <div class="step-item" id="step3">③ 내용 확인</div>
          <div class="step-item" id="step4">④ 결의서 생성</div>
        </div>

        <div class="grid-2">
          <div>
            <div class="card" style="margin-bottom:1rem">
              <div class="card-title"><i class="ti ti-upload" aria-hidden="true"></i> 파일 선택</div>
              <div class="upload-zone" id="upload-zone" onclick="document.getElementById('file-input').click()"
                   ondragover="event.preventDefault();this.classList.add('dragover')"
                   ondragleave="this.classList.remove('dragover')"
                   ondrop="handleDrop(event)">
                <i class="ti ti-file-type-pdf" aria-hidden="true"></i>
                <h3>PDF 파일을 여기에 드래그하거나 클릭하세요</h3>
                <p>소송비용청구서 · 전자세금계산서 · 영수증 모두 가능</p>
              </div>
              <input type="file" id="file-input" accept=".pdf,image/*" onchange="handleFileSelect(event)">
              <div id="file-info" style="margin-top:10px;font-size:13px;color:var(--muted);display:none">
                <i class="ti ti-file" aria-hidden="true"></i> <span id="file-name"></span>
              </div>
            </div>

            <div class="card">
              <div class="card-title"><i class="ti ti-info-circle" aria-hidden="true"></i> 인식 가능한 서류</div>
              <div style="display:flex;flex-direction:column;gap:6px">
                <div style="display:flex;align-items:center;gap:6px;font-size:12px"><i class="ti ti-check" style="color:var(--green-txt)" aria-hidden="true"></i> 소송비용청구서 (제4호 서식)</div>
                <div style="display:flex;align-items:center;gap:6px;font-size:12px"><i class="ti ti-check" style="color:var(--green-txt)" aria-hidden="true"></i> 전자세금계산서</div>
                <div style="display:flex;align-items:center;gap:6px;font-size:12px"><i class="ti ti-check" style="color:var(--green-txt)" aria-hidden="true"></i> 인지대 납부영수증</div>
                <div style="display:flex;align-items:center;gap:6px;font-size:12px"><i class="ti ti-check" style="color:var(--green-txt)" aria-hidden="true"></i> 송달료 납부영수증</div>
              </div>
            </div>
          </div>

          <div>
            <div class="card">
              <div class="card-title"><i class="ti ti-cpu" aria-hidden="true"></i> AI 분석 결과</div>
              <div id="parse-empty" style="text-align:center;padding:2rem;color:var(--muted);font-size:13px">
                <i class="ti ti-file-search" style="font-size:36px;display:block;margin-bottom:.75rem;opacity:.4" aria-hidden="true"></i>
                파일을 업로드하면 AI가 자동으로 내용을 분석합니다
              </div>

              <div class="loading-bar" id="loading-bar"><div class="loading-bar-fill"></div></div>
              <div class="loading-text" id="loading-text"><i class="ti ti-sparkles" aria-hidden="true"></i> AI가 청구서 내용을 분석하고 있습니다...</div>

              <div class="parse-result" id="parse-result">
                <div class="parse-header">
                  <i class="ti ti-circle-check" style="color:var(--green-txt);font-size:18px" aria-hidden="true"></i>
                  <span class="parse-status" style="color:var(--green-txt)">분석 완료 — 내용을 확인하고 수정하세요</span>
                </div>
                <div class="field-grid">
                  <div class="field-item">
                    <div class="field-label">재단 접수번호</div>
                    <input class="field-value editable" id="f-accnum" value="국부 26-110">
                  </div>
                  <div class="field-item">
                    <div class="field-label">서류 유형</div>
                    <input class="field-value editable" id="f-doctype" value="소송비용청구서">
                  </div>
                  <div class="field-item">
                    <div class="field-label">변호사</div>
                    <input class="field-value editable" id="f-lawyer" value="권우상">
                  </div>
                  <div class="field-item">
                    <div class="field-label">법무법인</div>
                    <input class="field-value editable" id="f-firm" value="법무법인 동북아">
                  </div>
                  <div class="field-item">
                    <div class="field-label">의뢰인</div>
                    <input class="field-value editable" id="f-client" value="강은지">
                  </div>
                  <div class="field-item">
                    <div class="field-label">상대방</div>
                    <input class="field-value editable" id="f-opponent" value="서광">
                  </div>
                  <div class="field-item">
                    <div class="field-label">사건명</div>
                    <input class="field-value editable" id="f-casename" value="승계집행문 부여">
                  </div>
                  <div class="field-item">
                    <div class="field-label">사건번호</div>
                    <input class="field-value editable" id="f-casenum" value="">
                  </div>
                  <div class="field-item">
                    <div class="field-label">착수금 (변호사 보수)</div>
                    <input class="field-value editable mono" id="f-fee" value="100,000">
                  </div>
                  <div class="field-item">
                    <div class="field-label">입금 계좌</div>
                    <input class="field-value editable mono" id="f-account" value="신한 140-014-761436">
                  </div>
                  <div class="field-item">
                    <div class="field-label">청구일자</div>
                    <input class="field-value editable" id="f-date" value="2026-04-21">
                  </div>
                  <div class="field-item">
                    <div class="field-label">세금서류</div>
                    <select class="field-value editable" id="f-taxtype" style="cursor:pointer">
                      <option>전자세금계산서</option>
                      <option>사업소득</option>
                      <option>미수령</option>
                    </select>
                  </div>
                </div>
                <div style="display:flex;gap:8px">
                  <button class="btn" onclick="resetUpload()"><i class="ti ti-refresh" aria-hidden="true"></i> 다시 업로드</button>
                  <button class="btn btn-primary" onclick="generateResolution()"><i class="ti ti-clipboard-list" aria-hidden="true"></i> 지출결의서 생성</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 지출결의서 미리보기 -->
        <div class="resol-preview" id="resol-preview">
          <div class="resol-header">
            <h3><i class="ti ti-clipboard-list" aria-hidden="true"></i> 지출결의서 생성 완료</h3>
            <div style="display:flex;gap:8px">
              <button class="btn btn-sm" style="background:rgba(255,255,255,.15);color:#fff;border-color:rgba(255,255,255,.3)" onclick="addToList()"><i class="ti ti-plus" aria-hidden="true"></i> 목록에 추가</button>
              <button class="btn btn-sm btn-success" onclick="showToast('지출결의서가 저장되었습니다')"><i class="ti ti-device-floppy" aria-hidden="true"></i> 저장</button>
            </div>
          </div>
          <div class="resol-body">
            <div class="resol-title">지   출   결   의   서</div>
            <div class="resol-sub">2026년 소송구조(국토부) / 전세피해자</div>
            <div class="resol-meta">
              <div class="resol-meta-item"><span class="resol-meta-label">작성일자</span><span class="resol-meta-value" id="rv-writedate">2026년 5월 28일</span></div>
              <div class="resol-meta-item"><span class="resol-meta-label">결재일자</span><span class="resol-meta-value">2026년 5월 __일</span></div>
              <div class="resol-meta-item"><span class="resol-meta-label">계정과목</span><span class="resol-meta-value">법률구조사업비 전세피해자사업비</span></div>
              <div class="resol-meta-item"><span class="resol-meta-label">결제방식</span><span class="resol-meta-value">계좌이체 (영수증)</span></div>
            </div>
            <div class="approval-row">
              <div class="approval-box"><div class="approval-role">담당</div><div class="approval-name" id="rv-staff"></div><div class="approval-stamp stamp-done">✓ 작성완료</div></div>
              <div class="approval-box"><div class="approval-role">사무총장</div><div class="approval-name">사무총장</div><div class="approval-stamp stamp-wait">결재 대기</div></div>
              <div class="approval-box"><div class="approval-role">재무이사</div><div class="approval-name">재무이사</div><div class="approval-stamp stamp-wait">결재 대기</div></div>
            </div>
            <table class="resol-table">
              <thead>
                <tr><th style="width:40px">순번</th><th>계정과목</th><th>적  요</th><th style="width:100px">금액</th><th style="width:60px">비고</th></tr>
              </thead>
              <tbody id="rv-tbody"></tbody>
            </table>
            <div class="resol-total"><span>합  계</span><span id="rv-total" class="mono"></span></div>
          </div>
        </div>
      </div>

      <!-- 지출결의서 목록 -->
      <div class="view" id="view-resol">
        <p class="page-title">지출결의서 관리</p>
        <p class="page-sub">사업별 지출결의서 목록 및 결재 현황</p>
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
            <div class="card-title" style="margin-bottom:0"><i class="ti ti-clipboard-list" aria-hidden="true"></i> 2026년 5월 결의서 목록</div>
            <button class="btn btn-primary btn-sm" onclick="showView('upload')"><i class="ti ti-plus" aria-hidden="true"></i> 새 결의서</button>
          </div>
          <table class="list-table" id="resol-list-table">
            <thead><tr><th>접수번호</th><th>변호사</th><th>의뢰인</th><th>사건명</th><th>금액</th><th>계산서</th><th>결재상태</th><th>작성일</th></tr></thead>
            <tbody id="resol-tbody"></tbody>
          </table>
        </div>
      </div>

      <!-- 지출 목록 -->
      <div class="view" id="view-list">
        <p class="page-title">지출 목록</p>
        <p class="page-sub">전체 사건 현황 — 색상으로 계산서 수령 상태 표시</p>
        <div style="display:flex;gap:8px;margin-bottom:1rem;flex-wrap:wrap">
          <span style="font-size:12px;color:var(--muted);padding:4px 0">범례:</span>
          <span class="badge badge-green">계산서 수령완료</span>
          <span class="badge badge-amber">계산서 미수령</span>
          <span class="badge badge-blue">결의서 작성완료</span>
        </div>
        <div class="card">
          <table class="list-table">
            <thead><tr><th>접수번호</th><th>변호사</th><th>의뢰인</th><th>사건명</th><th>유형</th><th>금액</th><th>계산서</th><th>결의서</th></tr></thead>
            <tbody id="list-tbody"></tbody>
          </table>
        </div>
      </div>

      <!-- 집행현황 -->
      <div class="view" id="view-account">
        <p class="page-title">집행 현황</p>
        <p class="page-sub">국토부 사업비 예산 대비 집행 현황</p>
        <div class="stat-grid">
          <div class="stat-card"><div class="stat-val">432,000,000</div><div class="stat-label">배정 예산 (원)</div></div>
          <div class="stat-card"><div class="stat-val">112,580,000</div><div class="stat-label">기집행액 (원)</div></div>
          <div class="stat-card"><div class="stat-val" style="color:var(--green-txt)">319,420,000</div><div class="stat-label">잔여 예산 (원)</div></div>
          <div class="stat-card"><div class="stat-val">26%</div><div class="stat-label">집행률</div></div>
        </div>
        <div class="card">
          <div class="card-title"><i class="ti ti-table" aria-hidden="true"></i> 월별 집행 내역</div>
          <table class="list-table">
            <thead><tr><th>월</th><th>지급건수</th><th>지급금액</th><th>수입</th><th>잔액</th><th>비고</th></tr></thead>
            <tbody>
              <tr><td>3월</td><td>47건</td><td class="mono">37,500,000</td><td class="mono">37,500,000 (가지급)</td><td class="mono">0</td><td style="font-size:11px;color:var(--muted)">서민금융재단</td></tr>
              <tr><td>4월</td><td>33건</td><td class="mono">26,600,000</td><td class="mono">26,600,000 (가지급)</td><td class="mono">0</td><td style="font-size:11px;color:var(--muted)">서민금융재단</td></tr>
              <tr><td>4월</td><td>—</td><td class="mono">-64,100,000</td><td class="mono">(가수금 반납)</td><td class="mono">—</td><td style="font-size:11px;color:var(--muted)">반납</td></tr>
              <tr><td>4월</td><td>—</td><td>—</td><td class="mono">195,000,000 (선금)</td><td class="mono">195,000,000</td><td style="font-size:11px;color:var(--muted)">국토부</td></tr>
              <tr style="background:#F0F4F8"><td><strong>5월 (예정)</strong></td><td><strong>28건</strong></td><td class="mono"><strong>28,480,000</strong></td><td>—</td><td class="mono"><strong>166,520,000</strong></td><td style="font-size:11px;color:var(--muted)">말일 입금예정</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 변호사 계좌 -->
      <div class="view" id="view-lawyer">
        <p class="page-title">변호사 계좌 정보</p>
        <p class="page-sub">입금 처리를 위한 변호사별 계좌 관리 — 노란 배경은 확인 필요</p>
        <div class="card">
          <table class="list-table">
            <thead><tr><th>변호사</th><th>은행</th><th>계좌번호</th><th>예금주</th><th>이메일</th><th>계산서유형</th><th>상태</th></tr></thead>
            <tbody>
              <tr class="row-green"><td>권우상</td><td>신한</td><td class="mono" style="font-size:11px">140-014-761436</td><td style="font-size:11px">법무법인 동북아</td><td style="font-size:11px">jbnfa123@naver.com</td><td><span class="badge badge-green">전자계산서</span></td><td><span class="badge badge-green">확인완료</span></td></tr>
              <tr class="row-green"><td>김동창</td><td>기업</td><td class="mono" style="font-size:11px">547-062599-04-011</td><td style="font-size:11px">법무법인 지름길</td><td style="font-size:11px">chang2law@naver.com</td><td><span class="badge badge-green">전자계산서</span></td><td><span class="badge badge-green">확인완료</span></td></tr>
              <tr class="row-amber"><td>김명철</td><td>신한</td><td style="background:#FFFBEB;color:#92400E;font-size:11px">확인 필요</td><td>—</td><td>—</td><td><span class="badge badge-amber">미확인</span></td><td><span class="badge badge-amber">확인필요</span></td></tr>
              <tr class="row-amber"><td>김주형</td><td>신한</td><td style="background:#FFFBEB;color:#92400E;font-size:11px">확인 필요</td><td>—</td><td>—</td><td><span class="badge badge-amber">미확인</span></td><td><span class="badge badge-amber">확인필요</span></td></tr>
              <tr class="row-amber"><td>류병욱</td><td>신한</td><td style="background:#FFFBEB;color:#92400E;font-size:11px">확인 필요</td><td>—</td><td>—</td><td><span class="badge badge-amber">미확인</span></td><td><span class="badge badge-amber">확인필요</span></td></tr>
              <tr class="row-green"><td>우원상</td><td>신한</td><td class="mono" style="font-size:11px">110-XXXXX</td><td style="font-size:11px">법무법인 지율</td><td>—</td><td><span class="badge badge-green">전자계산서</span></td><td><span class="badge badge-green">확인완료</span></td></tr>
              <tr class="row-amber"><td>육심원</td><td>신한</td><td style="background:#FFFBEB;color:#92400E;font-size:11px">확인 필요</td><td>—</td><td>—</td><td><span class="badge badge-amber">미확인</span></td><td><span class="badge badge-amber">확인필요</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>
</div>

<!-- 토스트 -->
<div class="toast" id="toast"></div>

<script>
const USERS = {
  'admin':   {pw:'1234', name:'관리자 (홍길동)', role:'admin'},
  'user1':   {pw:'1234', name:'담당자 (김소희)', role:'staff'},
  'finance': {pw:'1234', name:'재무이사', role:'finance'},
};

let currentUser = null;
const resolList = [];
const caseList = [
  {num:'국부 26-110',lawyer:'권우상',client:'강은지',case:'승계집행문 부여',type:'신청',amt:100000,tax:'수령',resol:'완료'},
  {num:'국부 26-153',lawyer:'김동창',client:'안가람',case:'임대차보증금반환소송',type:'민사',amt:1000000,tax:'미수령',resol:'대기'},
  {num:'국부 26-154',lawyer:'김동창',client:'신서영',case:'이의신청(불송치)',type:'형사',amt:500000,tax:'수령',resol:'완료'},
  {num:'국부 26-165',lawyer:'김동창',client:'신서영',case:'채권압류추심명령',type:'신청',amt:500000,tax:'미수령',resol:'대기'},
  {num:'국부 26-105',lawyer:'김명철',client:'이예나',case:'임대차보증금반환소송',type:'민사',amt:500000,tax:'미수령',resol:'대기'},
  {num:'국부 26-171',lawyer:'김명철',client:'김수현',case:'임대차보증금반환소송',type:'민사',amt:1000000,tax:'수령',resol:'완료'},
  {num:'국부 26-170',lawyer:'김주형',client:'권준희',case:'임대차보증금반환소송',type:'민사',amt:1000000,tax:'수령',resol:'완료'},
  {num:'국부 26-173',lawyer:'김주형',client:'권태영',case:'임대차보증금반환소송',type:'민사',amt:1000000,tax:'수령',resol:'완료'},
  {num:'국부 26-119',lawyer:'류병욱',client:'하서인',case:'임대차보증금반환소송',type:'민사',amt:1000000,tax:'미수령',resol:'대기'},
  {num:'국부 26-211',lawyer:'류원용',client:'이경아',case:'임대차보증금반환소송',type:'민사',amt:1200000,tax:'수령',resol:'완료'},
  {num:'국부 26-163',lawyer:'류제성',client:'강민경',case:'손해배상(중개인)',type:'민사',amt:1000000,tax:'수령',resol:'완료'},
  {num:'국부 26-159',lawyer:'신도성',client:'이경희',case:'사기',type:'형사',amt:100000,tax:'미수령',resol:'대기'},
  {num:'국부 26-129',lawyer:'우원상',client:'김정연',case:'손해배상(중개인)',type:'민사',amt:100000,tax:'미수령',resol:'대기'},
  {num:'국부 26-106',lawyer:'육심원',client:'이지연',case:'손해배상(공제금) 상3',type:'민사',amt:1400000,tax:'수령',resol:'완료'},
  {num:'국부 26-157',lawyer:'육심원',client:'금종민',case:'손해배상(공제금) 상2',type:'민사',amt:1200000,tax:'수령',resol:'완료'},
  {num:'국부 26-182',lawyer:'육심원',client:'김나연',case:'손해배상(공제금) 상2',type:'민사',amt:1200000,tax:'미수령',resol:'대기'},
  {num:'국부 26-168',lawyer:'윤종렬',client:'류지희 외4',case:'사기 상2',type:'형사',amt:2000000,tax:'수령',resol:'완료'},
  {num:'국부 26-149',lawyer:'이보연',client:'정서인',case:'손해배상(중개인) 상3',type:'민사',amt:1400000,tax:'수령',resol:'완료'},
];

function doLogin() {
  const id = document.getElementById('login-id').value.trim();
  const pw = document.getElementById('login-pw').value;
  const err = document.getElementById('login-error');
  if (USERS[id] && USERS[id].pw === pw) {
    currentUser = {...USERS[id], id};
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').classList.add('visible');
    document.getElementById('user-badge').textContent = currentUser.name;
    renderList();
    renderResolList();
  } else {
    err.style.display = 'block';
    setTimeout(()=> err.style.display='none', 3000);
  }
}

document.getElementById('login-pw').addEventListener('keydown', e => { if(e.key==='Enter') doLogin(); });
document.getElementById('login-id').addEventListener('keydown', e => { if(e.key==='Enter') document.getElementById('login-pw').focus(); });

function doLogout() {
  currentUser = null;
  document.getElementById('app').classList.remove('visible');
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('login-id').value='';
  document.getElementById('login-pw').value='';
}

function showView(name) {
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('view-'+name).classList.add('active');
  const map={dashboard:0,upload:1,resol:2,list:3,account:4,lawyer:5};
  document.querySelectorAll('.nav-item')[map[name]]?.classList.add('active');
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) processFile(file);
}

function handleDrop(e) {
  e.preventDefault();
  document.getElementById('upload-zone').classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) processFile(file);
}

function processFile(file) {
  document.getElementById('file-info').style.display = 'block';
  document.getElementById('file-name').textContent = file.name;
  document.getElementById('parse-empty').style.display = 'none';
  document.getElementById('loading-bar').style.display = 'block';
  document.getElementById('loading-text').style.display = 'block';
  document.getElementById('parse-result').style.display = 'none';
  document.getElementById('resol-preview').style.display = 'none';

  setStep(2);

  // 실제로는 Claude API로 PDF 분석
  // 여기서는 업로드된 파일명으로 샘플 데이터 시뮬레이션
  setTimeout(() => {
    document.getElementById('loading-bar').style.display = 'none';
    document.getElementById('loading-text').style.display = 'none';
    document.getElementById('parse-result').style.display = 'block';
    setStep(3);
    showToast('청구서 분석이 완료되었습니다');
  }, 2200);
}

function setStep(n) {
  for(let i=1;i<=4;i++){
    const el = document.getElementById('step'+i);
    el.className = 'step-item' + (i<n?' done':i===n?' cur':'');
  }
}

function generateResolution() {
  const accnum = document.getElementById('f-accnum').value;
  const lawyer = document.getElementById('f-lawyer').value;
  const client = document.getElementById('f-client').value;
  const casename = document.getElementById('f-casename').value;
  const fee = document.getElementById('f-fee').value.replace(/,/g,'');
  const taxtype = document.getElementById('f-taxtype').value;

  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일`;
  document.getElementById('rv-writedate').textContent = dateStr;
  document.getElementById('rv-staff').textContent = currentUser?.name || '담당자';

  const tbody = document.getElementById('rv-tbody');
  tbody.innerHTML = `
    <tr>
      <td style="text-align:center">1</td>
      <td style="font-size:11px">법률구조사업비 전세피해자사업비</td>
      <td style="font-size:12px">${lawyer} 弁 ${accnum.replace('국부 ','')}호 ${client} ${casename}</td>
      <td class="mono" style="text-align:right">${parseInt(fee).toLocaleString()}</td>
      <td style="text-align:center;font-size:11px">${taxtype==='전자세금계산서'?'계산서':'사업소득'}</td>
    </tr>`;
  document.getElementById('rv-total').textContent = parseInt(fee).toLocaleString() + ' 원';

  document.getElementById('resol-preview').style.display = 'block';
  document.getElementById('resol-preview').scrollIntoView({behavior:'smooth',block:'start'});
  setStep(4);
  showToast('지출결의서가 생성되었습니다');
}

function addToList() {
  const item = {
    num: document.getElementById('f-accnum').value,
    lawyer: document.getElementById('f-lawyer').value,
    client: document.getElementById('f-client').value,
    casename: document.getElementById('f-casename').value,
    fee: document.getElementById('f-fee').value,
    tax: document.getElementById('f-taxtype').value,
    status: '결재대기',
    date: new Date().toISOString().slice(0,10),
  };
  resolList.unshift(item);
  renderResolList();
  showView('resol');
  showToast('지출결의서가 목록에 추가되었습니다');
}

function resetUpload() {
  document.getElementById('file-input').value='';
  document.getElementById('file-info').style.display='none';
  document.getElementById('parse-result').style.display='none';
  document.getElementById('resol-preview').style.display='none';
  document.getElementById('parse-empty').style.display='block';
  setStep(1);
}

function renderList() {
  const tbody = document.getElementById('list-tbody');
  tbody.innerHTML = caseList.map(c => {
    const rowClass = c.tax==='수령' ? 'row-green' : 'row-amber';
    const taxBadge = c.tax==='수령'
      ? '<span class="badge badge-green">계산서수령</span>'
      : '<span class="badge badge-amber">미수령</span>';
    const resolBadge = c.resol==='완료'
      ? '<span class="badge badge-blue">작성완료</span>'
      : '<span class="badge" style="background:var(--light);color:var(--muted)">대기</span>';
    const typeBadge = c.type==='민사'
      ? '<span class="badge badge-navy">민사</span>'
      : c.type==='형사'
      ? '<span class="badge badge-red" style="background:#FEE2E2;color:#991B1B">형사</span>'
      : '<span class="badge" style="background:var(--light);color:var(--muted)">신청</span>';
    return `<tr class="${rowClass}">
      <td class="mono" style="font-size:11px">${c.num}</td>
      <td>${c.lawyer}</td>
      <td>${c.client}</td>
      <td style="font-size:12px">${c.case}</td>
      <td>${typeBadge}</td>
      <td class="mono">${c.amt.toLocaleString()}</td>
      <td>${taxBadge}</td>
      <td>${resolBadge}</td>
    </tr>`;
  }).join('');
}

function renderResolList() {
  const initialData = [
    {num:'국부 26-110',lawyer:'권우상',client:'강은지',casename:'승계집행문 부여',fee:'100,000',tax:'전자세금계산서',status:'결재완료',date:'2026-05-14'},
    {num:'국부 26-154',lawyer:'김동창',client:'신서영',casename:'이의신청(불송치)',fee:'500,000',tax:'전자세금계산서',status:'결재완료',date:'2026-05-14'},
    {num:'국부 26-170',lawyer:'김주형',client:'권준희',casename:'임대차보증금반환소송',fee:'1,000,000',tax:'전자세금계산서',status:'결재완료',date:'2026-05-14'},
  ];
  const all = [...resolList, ...initialData];
  const tbody = document.getElementById('resol-tbody');
  tbody.innerHTML = all.map(r => {
    const st = r.status==='결재완료'
      ? '<span class="badge badge-green">결재완료</span>'
      : '<span class="badge badge-amber">결재대기</span>';
    return `<tr>
      <td class="mono" style="font-size:11px">${r.num}</td>
      <td>${r.lawyer}</td>
      <td>${r.client}</td>
      <td style="font-size:12px">${r.casename}</td>
      <td class="mono">${r.fee}</td>
      <td><span class="badge badge-green">${r.tax}</span></td>
      <td>${st}</td>
      <td style="font-size:11px;color:var(--muted)">${r.date}</td>
    </tr>`;
  }).join('');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.innerHTML = `<i class="ti ti-circle-check" aria-hidden="true"></i> ${msg}`;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 3000);
}
</script>
</body>
</html>
