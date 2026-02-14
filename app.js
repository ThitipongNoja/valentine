document.addEventListener('DOMContentLoaded', () => {
    const showInputBtn = document.getElementById('show-input-btn');
    const passwordForm = document.getElementById('password-form');
    const unlockBtn = document.getElementById('unlock-btn');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('error-msg');
    const loginScreen = document.getElementById('login-screen');
    const cardScreen = document.getElementById('card-screen');
    const card = document.getElementById('valentine-card');
    const bgElements = document.getElementById('bg-elements');

    let wrongAttempts = 0;
    let hintTimeout;

    const hints = [
        "คำใบ้ที่ 1: วันเดือนปี",
        "คำใบ้ที่ 2: ง่ายมากๆ แค่นี้ไม่รู้หรอออ!!!",
        "คำใบ้ที่ 3: 21",
        "คำใบ้ที่ 4: ยังอีก!!",
        "คำใบ้ที่ 5: ค โอะ บ",
        "คำใบ้ที่ 6: 06",
        "คำใบ้ที่ 7: ค.ศ.",
        "หมดละลองคิดดีๆ!!!!",
    ];

    // 1. สร้างเอฟเฟกต์หัวใจ/ดอกไม้ลอยหลังฉาก (ตลอดเวลา)
    const createDecoration = () => {
        const items = ['🌸', '❤️', '💖', '✨'];
        const item = document.createElement('div');
        item.innerHTML = items[Math.floor(Math.random() * items.length)];
        item.style.position = 'absolute';
        item.style.left = Math.random() * 100 + 'vw';
        item.style.top = '110vh';
        item.style.fontSize = Math.random() * 20 + 20 + 'px';
        item.style.opacity = '0';
        item.style.transition = 'transform 6s linear, opacity 3s';
        item.style.zIndex = '0';
        bgElements.appendChild(item);
        setTimeout(() => {
            item.style.transform = `translateY(-120vh) rotate(${Math.random() * 360}deg)`;
            item.style.opacity = Math.random() * 0.5 + 0.3;
        }, 100);
        setTimeout(() => item.remove(), 7000);
    };
    setInterval(createDecoration, 600);

    // 2. เอฟเฟกต์หัวใจระเบิดเมื่อใส่ผิด
    const createExplodingHearts = () => {
        for (let i = 0; i < 25; i++) {
            const heart = document.createElement('div');
            const heartTypes = ['❤️', '💖', '✨', '🌸', '💔'];
            heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            heart.className = 'exploding-heart';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.setProperty('--tx', `${(Math.random() - 0.5) * 600}px`);
            heart.style.setProperty('--ty', `${(Math.random() - 0.5) * 600}px`);
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1500);
        }
    };

    // 3. แสดงฟอร์มใส่รหัส
    showInputBtn.addEventListener('click', () => {
        showInputBtn.classList.add('hidden');
        passwordForm.classList.remove('hidden');
        passwordInput.focus();
    });

    // 4. ฟังก์ชันหลักในการตรวจสอบรหัสผ่าน
    const handleUnlock = () => {
        const inputVal = passwordInput.value.trim();
        clearTimeout(hintTimeout); // ล้างเวลาแสดงคำใบ้เก่า
        //21062025
        if (inputVal === '21062025') {
            // รหัสถูกต้อง
            loginScreen.style.opacity = '0';
            loginScreen.style.transition = '0.8s';
            setTimeout(() => {
                loginScreen.classList.add('hidden');
                cardScreen.classList.remove('hidden');
            }, 800);
        } else {
            // รหัสผิด
            wrongAttempts++;
            createExplodingHearts();

            // แสดงคำใบ้
            const hintIndex = Math.min(wrongAttempts - 1, hints.length - 1);
            errorMsg.innerText = hints[hintIndex];
            errorMsg.style.display = 'inline-block';

            // เอฟเฟกต์สั่นช่องกรอก
            passwordInput.classList.add('shake');
            setTimeout(() => passwordInput.classList.remove('shake'), 500);

            // แสดงคำใบ้ค้างไว้ 15 วินาที
            hintTimeout = setTimeout(() => {
                errorMsg.style.display = 'none';
            }, 15000);
        }
    };

    // ปุ่มยืนยัน
    unlockBtn.addEventListener('click', handleUnlock);

    // กด Enter ในช่องรหัส
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUnlock();
    });

    // 5. คลิกเพื่อพลิกการ์ด
    card.addEventListener('click', () => {
        card.classList.toggle('open');
    });
});

// เพิ่มฟังก์ชันเหล่านี้ในไฟล์ app.js

// เปลี่ยนหน้าจากหน้าการ์ดไปหน้าของขวัญ
document.getElementById('go-to-gift-btn').addEventListener('click', (e) => {
    e.stopPropagation(); // กันไม่ให้การ์ดพลิกกลับ
    document.getElementById('card-screen').classList.add('hidden');
    document.getElementById('gift-screen').classList.remove('hidden');
});

// ฟังก์ชันเปิดของขวัญ
function openGift(boxNum) {
    const modal = document.getElementById('gift-modal');
    const msg = document.getElementById('gift-message');

    let text = "";
    if (boxNum === 1) text = "ช็อปปิ้ง 500 จัดไปปปป ❤️";
    if (boxNum === 2) text = "ชาบูเซตพรีเมี่ยมไปเลย ✨";
    if (boxNum === 3) text = "รักหนูเกดตลอดไปปปปปปปป 🌸";
    if (boxNum === 4) text = "กินของกินตามใจเกด 🌸";
    if (boxNum === 5) text = "ไปดินเนอร์ร้านอาหาร ✨";

    msg.innerText = text;
    modal.classList.remove('hidden');
}

// ฟังก์ชันปิด Modal
function closeModal() {
    document.getElementById('gift-modal').classList.add('hidden');
}

let text = "";
if (boxNum === 1) text = "ช็อปปิ้ง 500 จัดไปปปป ❤️";
if (boxNum === 2) text = "ชาบูเซตพรีเมี่ยมไปเลย ✨";
if (boxNum === 3) text = "รักหนูเกดตลอดไปปปปปปปป 🌸";
if (boxNum === 4) text = "กินของกินตามใจเกด 🌸";
if (boxNum === 5) text = "ไปดินเนอร์ร้านอาหาร ✨";