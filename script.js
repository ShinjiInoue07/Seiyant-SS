// Translations
const translations = {
    id: { 
        heroTitle: "Shader Downloads", 
        heroSubhead: "Semua shader yang diedit oleh Seiyant", 
        followLabel: "Ikuti TikTok →", 
        donateTitle: "Dukung Seiyant", 
        donateSub: "Donasi via Sociabuzz • Terima Kasih", 
        disclaimerTitle: "Disclaimer", 
        disclaimerText: "<p>Semua file shader di sini cuma hasil edit dari gw, Seiyant. Gw bukan pembuat asli shadernya dan nggak pernah ngaku sebagai dev aslinya. Gw cuman nyetting tampilannya biar sedikit lebih cakep & ringan. Semua hak cipta tetep milik developer asli shader tersebut.</p><p>Semua settingan shader itu gratis. Jadi jangan keluarin uang cuma buat beli settingan shader, respect sama developernya cuy.</p>", 
        searchPlaceholder: "Cari file...", 
        prevText: "Sebelumnya", 
        nextText: "Selanjutnya", 
        pagePrefix: "Hal.", 
        showingText: "Menampilkan", 
        ofText: "dari", 
        shadersText: "shader", 
        noResultText: "Tidak ada shader yang cocok", 
        easterEgg: { question: "🤓😹😛", message: "🩲", button: "BALIK" }, 
        gallery: { title: "Pengaturan Mobile Glues", sub: "Klik gambar untuk melihat ukuran penuh", close: "Tutup" }
    },
    en: { 
        heroTitle: "Shader Downloads", 
        heroSubhead: "All shaders edited by Seiyant", 
        followLabel: "Follow TikTok →", 
        donateTitle: "Support Seiyant", 
        donateSub: "Donate via Sociabuzz • Thank You", 
        disclaimerTitle: "Disclaimer", 
        disclaimerText: "<p>All shader files here are just edits made by me, Seiyant. I'm not the original creator of any of these shaders, and I never claim to be. I just tweak the settings to make them look a bit better and run a bit smoother. All copyrights belong to the original shader developers.</p><p>All shader settings are free. So don't waste your money buying shader configs, show some respect and support the original developers instead.</p>", 
        searchPlaceholder: "Search files...", 
        prevText: "Prev", 
        nextText: "Next", 
        pagePrefix: "Page", 
        showingText: "Showing", 
        ofText: "of", 
        shadersText: "shaders", 
        noResultText: "No matching shaders", 
        easterEgg: { question: "😛😹🤓", message: "🩲", button: "GET OUT!" }, 
        gallery: { title: "Mobile Glues Settings", sub: "Click image to view full size", close: "Close" }
    }
};

let currentLang = 'en';
let currentPage = 1;
let currentDisplayItems = [];
const allItemsOriginal = Array.from(document.querySelectorAll('#downloadList .download-item'));
const ITEMS_PER_PAGE = 8;

function renderPageWithCustomList(itemList, page) { 
    if (!itemList) itemList = currentDisplayItems; 
    const total = Math.ceil(itemList.length / ITEMS_PER_PAGE); 
    if (page < 1) page = 1; 
    if (page > total && total > 0) page = total; 
    if (total === 0) page = 1; 
    const start = (page - 1) * ITEMS_PER_PAGE; 
    const end = start + ITEMS_PER_PAGE; 
    allItemsOriginal.forEach(it => it.style.display = 'none'); 
    for (let i = start; i < end && i < itemList.length; i++) itemList[i].style.display = ''; 
    currentPage = page; 
    const t = translations[currentLang]; 
    const prefix = t ? t.pagePrefix : 'Page'; 
    document.getElementById('pageIndicatorTop').innerText = `${prefix} ${page}`; 
    document.getElementById('pageIndicatorBottom').innerText = `${prefix} ${page}`; 
    const prevBtns = [document.getElementById('prevBtnTop'), document.getElementById('prevBtnBottom')]; 
    const nextBtns = [document.getElementById('nextBtnTop'), document.getElementById('nextBtnBottom')]; 
    prevBtns.forEach(btn => { 
        if (page === 1) btn.classList.add('disabled'); 
        else btn.classList.remove('disabled'); 
    }); 
    nextBtns.forEach(btn => { 
        if (page === total) btn.classList.add('disabled'); 
        else btn.classList.remove('disabled'); 
    }); 
    const info = document.getElementById('paginationInfo'); 
    if (info && t) { 
        if (itemList.length === 0) info.innerText = t.noResultText; 
        else info.innerText = `${t.showingText} ${start+1} - ${Math.min(end, itemList.length)} ${t.ofText} ${itemList.length} ${t.shadersText}`; 
    } 
}

function applyLanguage(lang) { 
    const t = translations[lang]; 
    if (!t) return; 
    document.getElementById('heroTitle').innerText = t.heroTitle; 
    document.getElementById('heroSubhead').innerText = t.heroSubhead; 
    document.getElementById('followLabel').innerText = t.followLabel; 
    document.getElementById('donateTitle').innerHTML = t.donateTitle + ' <span class="material-symbols-outlined" style="font-size: 16px;">volunteer_activism</span>'; 
    document.getElementById('donateSub').innerText = t.donateSub; 
    document.getElementById('disclaimerTitle').innerText = t.disclaimerTitle; 
    document.getElementById('disclaimerText').innerHTML = t.disclaimerText; 
    document.getElementById('searchInput').placeholder = t.searchPlaceholder; 
    document.querySelectorAll('#prevText, #prevTextBottom').forEach(el => el.innerText = t.prevText); 
    document.querySelectorAll('#nextText, #nextTextBottom').forEach(el => el.innerText = t.nextText); 
    document.getElementById('langBtnText').innerText = lang === 'id' ? 'EN' : 'ID'; 
    
    const prefix = t.pagePrefix;
    document.getElementById('pageIndicatorTop').innerText = `${prefix} ${currentPage}`;
    document.getElementById('pageIndicatorBottom').innerText = `${prefix} ${currentPage}`;
    
    const info = document.getElementById('paginationInfo');
    if (info && currentDisplayItems) {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        if (currentDisplayItems.length === 0) info.innerText = t.noResultText;
        else info.innerText = `${t.showingText} ${start+1} - ${Math.min(end, currentDisplayItems.length)} ${t.ofText} ${currentDisplayItems.length} ${t.shadersText}`;
    }
    
    localStorage.setItem('seiyantLang', lang); 
    currentLang = lang; 
}

function showEasterEggPage() { 
    if (document.getElementById('easterEggOverlay')) return; 
    const t = translations[currentLang].easterEgg; 
    const overlay = document.createElement('div'); 
    overlay.id = 'easterEggOverlay'; 
    overlay.className = 'easter-egg-page'; 
    overlay.innerHTML = `<div class="egg-content"><div class="question-mark">${t.question}</div><div class="egg-image"><img src="https://i.postimg.cc/jqzHJszv/b6beb8efde7ce38d2b303f20b714bb22.jpg" alt="Secret"></div><div class="egg-message">${t.message}</div><button class="back-button" id="easterEggBackBtn"><span class="material-symbols-outlined">arrow_back</span>${t.button}</button></div>`; 
    document.body.appendChild(overlay); 
    document.getElementById('easterEggBackBtn').addEventListener('click', () => overlay.remove()); 
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); }); 
}

function showGallery() { 
    if (document.getElementById('galleryModal')) return; 
    const t = translations[currentLang].gallery; 
    const galleryImages = [ 
        { url: "https://i.postimg.cc/0NXjC0Mb/Screenshot-20260531-120321.jpg", title: "Mobile Glues 1.3.4 - Settings" }, 
        { url: "https://i.postimg.cc/jj32h4wD/Screenshot-20260531-120345.jpg", title: "Mobile Glues 1.3.4 - Display" }, 
        { url: "https://i.postimg.cc/CKr54sBZ/Screenshot-20260531-120409.jpg", title: "Mobile Glues 1.3.3 - Main" } 
    ]; 
    const modal = document.createElement('div'); 
    modal.id = 'galleryModal'; 
    modal.className = 'gallery-modal'; 
    let imagesHtml = ''; 
    galleryImages.forEach(img => { imagesHtml += `<img src="${img.url}" class="gallery-img" alt="${img.title}" title="${img.title}">`; }); 
    modal.innerHTML = `<div class="gallery-content"><div class="gallery-title">${t.title}</div><div class="gallery-sub">${t.sub}</div><div class="gallery-grid">${imagesHtml}</div><button class="gallery-close" id="galleryCloseBtn">${t.close}</button></div>`; 
    document.body.appendChild(modal); 
    document.querySelectorAll('.gallery-img').forEach(img => img.addEventListener('click', () => window.open(img.src, '_blank'))); 
    document.getElementById('galleryCloseBtn').addEventListener('click', () => modal.remove()); 
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); }); 
}

// Event Listeners
document.getElementById('heroEasterTrigger').addEventListener('click', showEasterEggPage);
document.getElementById('galleryToggleBtn').addEventListener('click', showGallery);

document.getElementById('searchInput').addEventListener('input', (e) => { 
    const keyword = e.target.value.toLowerCase(); 
    currentDisplayItems = allItemsOriginal.filter(item => item.querySelector('.item-title').innerText.toLowerCase().includes(keyword)); 
    renderPageWithCustomList(currentDisplayItems, 1); 
});

document.getElementById('prevBtnTop')?.addEventListener('click', () => { 
    if (currentPage > 1) renderPageWithCustomList(currentDisplayItems, currentPage - 1); 
});

document.getElementById('nextBtnTop')?.addEventListener('click', () => { 
    const total = Math.ceil(currentDisplayItems.length / ITEMS_PER_PAGE); 
    if (currentPage < total) renderPageWithCustomList(currentDisplayItems, currentPage + 1); 
});

document.getElementById('prevBtnBottom')?.addEventListener('click', () => { 
    if (currentPage > 1) renderPageWithCustomList(currentDisplayItems, currentPage - 1); 
});

document.getElementById('nextBtnBottom')?.addEventListener('click', () => { 
    const total = Math.ceil(currentDisplayItems.length / ITEMS_PER_PAGE); 
    if (currentPage < total) renderPageWithCustomList(currentDisplayItems, currentPage + 1); 
});

// Dark Mode
const darkToggle = document.getElementById('darkModeToggle'); 
function applyDarkMode(isDark) { 
    if (isDark) document.body.classList.add('dark'); 
    else document.body.classList.remove('dark'); 
    localStorage.setItem('seiyantDarkMode', isDark ? 'enabled' : 'disabled'); 
} 
if (localStorage.getItem('seiyantDarkMode') === 'enabled') applyDarkMode(true); 
darkToggle.addEventListener('click', () => applyDarkMode(!document.body.classList.contains('dark')));

// Initialize
const savedLang = localStorage.getItem('seiyantLang'); 
currentDisplayItems = [...allItemsOriginal]; 
applyLanguage(savedLang === 'id' ? 'id' : 'en'); 
document.getElementById('langToggleBtn').addEventListener('click', () => applyLanguage(currentLang === 'id' ? 'en' : 'id'));