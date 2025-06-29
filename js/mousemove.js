// マウス追従エフェクト
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.background = 'rgba(255, 255, 255, 0.1)';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.animation = 'cursorFade 1s forwards';

    document.body.appendChild(cursor);

    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// カーソルフェードアニメーション
const style = document.createElement('style');
style.textContent = `
            @keyframes cursorFade {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(2); }
            }
        `;
document.head.appendChild(style);