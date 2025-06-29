// モバイルメニューの切り替え
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu.classList.contains('show')) {
        // 閉じるときはアニメーション
        menu.classList.remove('show');
        menu.classList.add('hide');
        menu.addEventListener('animationend', function handler() {
            menu.classList.remove('hide');
            menu.style.display = 'none';
            menu.removeEventListener('animationend', handler);
        });
    } else {
        // 開くとき
        menu.style.display = 'block';
        menu.classList.add('show');
        menu.classList.remove('hide');
    }
}

// ページがトップページかどうかを判定
function isTopPage() {
    return window.location.pathname === SITE_CONFIG.rootPath + '/' || window.location.pathname === SITE_CONFIG.rootPath + '/index.html';
}

// スクロール時のメニュー表示制御
function handleScroll() {
    const scrollPosition = window.scrollY;
    const triggerHeight = window.innerHeight; // 画面の高さ分スクロールしたらメニューを表示

    const floatingMenu = document.querySelector('.floating-menu');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

    if (floatingMenu && mobileMenuToggle) {
        if (isTopPage()) {
            // トップページの場合のみスクロールで表示制御
            if (scrollPosition > triggerHeight) {
                floatingMenu.classList.add('show');
                mobileMenuToggle.classList.add('show');
            } else {
                floatingMenu.classList.remove('show');
                mobileMenuToggle.classList.remove('show');
            }
        }
        else {
            // トップページ以外は常に表示
            floatingMenu.classList.add('show');
            mobileMenuToggle.classList.add('show');
        }
    }
}

// 初期化時にメニューを表示
function initializeMenu() {
    const floatingMenu = document.querySelector('.floating-menu');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    console.log(isTopPage());

    if (floatingMenu && mobileMenuToggle && !isTopPage()) {
        // トップページ以外は最初から表示
        console.log('show');
        floatingMenu.classList.add('show');
        mobileMenuToggle.classList.add('show');
    }
}

// フローティングメニューの読み込み完了を監視
function waitForFloatingMenu() {
    const floatingMenu = document.querySelector('.floating-menu');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

    if (floatingMenu && mobileMenuToggle) {
        // 要素が存在する場合は初期化
        initializeMenu();
    } else {
        // 要素が存在しない場合は少し待ってから再試行
        setTimeout(waitForFloatingMenu, 100);
    }
}

// スクロールイベントリスナーを追加
window.addEventListener('scroll', handleScroll);

// メニュー外クリックで閉じる
document.addEventListener('click', function (event) {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    if (menu && toggle && !menu.contains(event.target) && !toggle.contains(event.target)) {
        menu.classList.remove('show');
    }
});

// DOM読み込み完了時にフローティングメニューの読み込み完了を待つ
document.addEventListener('DOMContentLoaded', waitForFloatingMenu);
