
// ルートディレクトリからのパスを表すプレフィックス
// コンポーネント内では "/page/about/" のように記述し、
// 実行時にSITE_CONFIG.rootPathと結合して絶対パスに変換される
const ROOT_PATH_PREFIX = '/';

// ルートパス（/で始まるパス）を絶対パスに変換する関数
function convertRootPathToAbsolute(rootPath) {
    if (!rootPath.startsWith(ROOT_PATH_PREFIX)) {
        return rootPath; // 既に絶対パスまたは相対パスの場合はそのまま返す
    }

    const relativePath = rootPath.substring(ROOT_PATH_PREFIX.length); // 先頭の/を削除
    return SITE_CONFIG.rootPath + '/' + relativePath;
}

// コンポーネント内のルートパス（/で始まるパス）を絶対パスに変換する関数
function convertRootPathsToAbsolute(componentElement) {
    // すべてのリンクを取得
    const links = componentElement.querySelectorAll('a[href]');

    links.forEach(link => {
        const href = link.getAttribute('href');
        const convertedHref = convertRootPathToAbsolute(href);
        link.setAttribute('href', convertedHref);
    });
}

// コンポーネントを読み込む関数
function loadComponent(componentName, placeholderId) {
    const componentPath = SITE_CONFIG.rootPath + '/component/' + componentName + '.html';
    console.log(componentPath);

    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = data;

                // コンポーネント内のルートパスを絶対パスに変換
                convertRootPathsToAbsolute(placeholder);
            }
        })
        .catch(error => {
            console.error(`Error loading ${componentName}:`, error);
        });
}

// ヘッダー，フッター，フローティングメニューを読み込む
document.addEventListener('DOMContentLoaded', function () {
    loadComponent('header', 'header-placeholder');
    loadComponent('footer', 'footer-placeholder');
    loadComponent('floating_menu', 'floating-menu-placeholder');
});