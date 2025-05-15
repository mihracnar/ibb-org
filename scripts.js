// Temel veri yapıları
let managerData = []; // Yönetici bilgileri
let structureData = []; // Müdürlük hiyerarşi bilgileri 
let organizationData = []; // Oluşturulacak organizasyon ağacı

// Organizasyon ilişki haritaları
let unitParentMap = {}; // Birim -> Üst birim eşlemesi
let unitLevelMap = {}; // Birim -> Seviye eşlemesi (1: GSY, 2: Daire, 3: Müdürlük)
let gsyDaireMap = {}; // GSY -> Daireler listesi
let daireMudurlukMap = {}; // Daire -> Müdürlükler listesi

// Birim ikonları - ID'ye göre
const unitIcons = {
    // GSY Seviyesi
    "gsy3": "fa-sitemap",
    "gsy4": "fa-sitemap",
    
    // Daire Başkanlıkları
    "kultur-daire": "fa-landmark",
    "kultur-varliklari": "fa-monument",
    "sosyal-hizmetler": "fa-hands-helping",
    "muhtarlik-isleri": "fa-building-user",
    "deprem-risk": "fa-house-crack",
    "imar-sehircilik": "fa-building",
    
    // Müdürlükler
    "kulturel-etkinlikler": "fa-theater-masks",
    "orkestralar": "fa-music",
    "sehir-tiyatro": "fa-masks-theater",
    "turizm": "fa-plane",
    "dini-kurumlar": "fa-place-of-worship",
    "stk-iliskileri": "fa-people-group",
    "koruma-uygulama": "fa-shield-alt",
    "kultur-projeler": "fa-drafting-compass",
    "kulturel-miras": "fa-archway",
    "kutuphane-muze": "fa-book",
    "kadin-aile": "fa-female",
    "sosyal-hizmet": "fa-hand-holding-heart",
    "cocuk-hizmetler": "fa-child",
    "engelli-hizmetleri": "fa-wheelchair",
    "sehit-gazi": "fa-flag",
    "avrupa-muhtarlik": "fa-map-marked-alt",
    "muhtarlik-destek": "fa-handshake-angle",
    "anadolu-muhtarlik": "fa-map-marked",
    "bogazici-imar": "fa-bridge-water",
    "deprem-zemin": "fa-microscope",
    "kentsel-donusum-uygulama": "fa-city",
    "kentsel-donusum-planlama": "fa-compass-drafting",
    "harita": "fa-map",
    "imar": "fa-drafting-compass",
    "planlama": "fa-layer-group",
    "sehir-planlama": "fa-city"
};

// Sayfa yüklendiğinde çalışacak ana fonksiyon
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Yönetici verilerini yükle
        await loadManagerData();
        
        // Müdürlük yapı verilerini yükle
        await loadStructureData();
        
        // Organizasyon verilerini oluştur
        buildOrganizationData();
        
        // Organizasyon ilişki haritasını oluştur
        buildOrganizationMap();
        
        // Organizasyon ağacını oluştur
        buildOrganizationTree(organizationData);
        
        // Modal işlemleri
        setupModalHandlers();
        
        // Arama işlemleri
        setupSearchHandlers();
    } catch (error) {
        console.error("Sayfa yüklenirken bir hata oluştu:", error);
    }
});

// Yönetici verilerini yükleyen fonksiyon
async function loadManagerData() {
    try {
        const response = await fetch('data/yonetici-listesi.json');
        if (!response.ok) {
            throw new Error(`HTTP hata! Durum: ${response.status}`);
        }
        managerData = await response.json();
        console.log("Yönetici verileri başarıyla yüklendi:", managerData);
    } catch (error) {
        console.error("Yönetici verileri yüklenirken bir hata oluştu:", error);
        // Hata durumunda boş dizi kullanalım
        managerData = [];
    }
}

// Müdürlük yapı verilerini yükleyen fonksiyon
async function loadStructureData() {
    try {
        const response = await fetch('data/mudurluk-listesi.json');
        if (!response.ok) {
            throw new Error(`HTTP hata! Durum: ${response.status}`);
        }
        structureData = await response.json();
        console.log("Yapı verileri başarıyla yüklendi:", structureData);
    } catch (error) {
        console.error("Yapı verileri yüklenirken bir hata oluştu:", error);
        // Hata durumunda boş dizi kullanalım
        structureData = [];
    }
}

// Müdürlük yapı verilerinden organizasyon verilerini oluşturan fonksiyon
function buildOrganizationData() {
    // Önce GSY'leri belirle
    const gsyList = [...new Set(structureData.map(item => item["gsy-id"]))].filter(Boolean);
    
    organizationData = gsyList.map(gsyId => {
        // GSY'ye ait birim adını bul
        const gsyName = getBirimAdi(gsyId);
        
        // GSY altındaki daireleri bul
        const daireList = [...new Set(
            structureData
                .filter(item => item["gsy-id"] === gsyId && item["daire-id"])
                .map(item => item["daire-id"])
        )].filter(Boolean);
        
        // GSY altındaki direkt müdürlükleri bul (dairesiz)
        const directMudurlukList = structureData
            .filter(item => item["gsy-id"] === gsyId && !item["daire-id"] && item["mudurluk-id"])
            .map(item => item["mudurluk-id"]);
        
        // GSY objesini oluştur
        const gsyObj = {
            id: gsyId,
            title: gsyName || gsyId.toUpperCase(),
            icon: unitIcons[gsyId] || "fa-sitemap",
            children: []
        };
        
        // Daireleri ekle
        daireList.forEach(daireId => {
            // Daire adını bul
            const daireName = getBirimAdi(daireId);
            
            // Daire altındaki müdürlükleri bul
            const mudurlukList = structureData
                .filter(item => item["daire-id"] === daireId && item["mudurluk-id"])
                .map(item => item["mudurluk-id"]);
                
            // Daire objesini oluştur
            const daireObj = {
                id: daireId,
                title: daireName || daireId.toUpperCase(),
                icon: unitIcons[daireId] || "fa-building",
                children: []
            };
            
            // Müdürlükleri ekle
            mudurlukList.forEach(mudurlukId => {
                // Müdürlük adını bul
                const mudurlukName = getBirimAdi(mudurlukId);
                
                // Müdürlük objesini oluştur
                const mudurlukObj = {
                    id: mudurlukId,
                    title: mudurlukName || mudurlukId.toUpperCase(),
                    icon: unitIcons[mudurlukId] || "fa-briefcase"
                };
                
                // Müdürlüğü daireye ekle
                daireObj.children.push(mudurlukObj);
            });
            
            // Daireyi GSY'ye ekle
            gsyObj.children.push(daireObj);
        });
        
        // Direkt müdürlükleri ekle (dairesiz)
        directMudurlukList.forEach(mudurlukId => {
            // Müdürlük adını bul
            const mudurlukName = getBirimAdi(mudurlukId);
            
            // Müdürlük objesini oluştur
            const mudurlukObj = {
                id: mudurlukId,
                title: mudurlukName || mudurlukId.toUpperCase(),
                icon: unitIcons[mudurlukId] || "fa-briefcase"
            };
            
            // Müdürlüğü direkt GSY'ye ekle
            gsyObj.children.push(mudurlukObj);
        });
        
        return gsyObj;
    });
    
    console.log("Organizasyon verisi oluşturuldu:", organizationData);
}

// Birim ID'sine göre birim adını getiren fonksiyon
function getBirimAdi(birimId) {
    const manager = managerData.find(m => m.id === birimId);
    return manager ? manager.birim : null;
}

// Organizasyon ilişki haritasını oluşturan fonksiyon
function buildOrganizationMap() {
    // Haritaları sıfırla
    unitParentMap = {};
    unitLevelMap = {};
    gsyDaireMap = {};
    daireMudurlukMap = {};
    
    // structureData'dan haritalama oluştur
    structureData.forEach(item => {
        const gsyId = item["gsy-id"];
        const daireId = item["daire-id"];
        const mudurlukId = item["mudurluk-id"];
        
        // GSY seviyesi için
        if (gsyId) {
            unitLevelMap[gsyId] = 1;
            
            if (!gsyDaireMap[gsyId]) {
                gsyDaireMap[gsyId] = [];
            }
        }
        
        // Daire seviyesi için
        if (daireId) {
            unitParentMap[daireId] = gsyId;
            unitLevelMap[daireId] = 2;
            
            if (gsyId && !gsyDaireMap[gsyId].includes(daireId)) {
                gsyDaireMap[gsyId].push(daireId);
            }
            
            if (!daireMudurlukMap[daireId]) {
                daireMudurlukMap[daireId] = [];
            }
        }
        
        // Müdürlük seviyesi için
        if (mudurlukId) {
            if (daireId) {
                unitParentMap[mudurlukId] = daireId;
                unitLevelMap[mudurlukId] = 3;
                
                if (!daireMudurlukMap[daireId].includes(mudurlukId)) {
                    daireMudurlukMap[daireId].push(mudurlukId);
                }
            } else if (gsyId) {
                // Direkt GSY'ye bağlı müdürlük
                unitParentMap[mudurlukId] = gsyId;
                unitLevelMap[mudurlukId] = 2; // Daire seviyesinde değerlendiriyoruz
            }
        }
    });
    
    console.log("Birim-Üst Birim Haritası:", unitParentMap);
    console.log("Birim-Seviye Haritası:", unitLevelMap);
    console.log("GSY-Daire Haritası:", gsyDaireMap);
    console.log("Daire-Müdürlük Haritası:", daireMudurlukMap);
}

// Bir birimin üst birimini bulan fonksiyon
function getParentUnit(unitId) {
    return unitParentMap[unitId] || null;
}

// Bir birimin seviyesini bulan fonksiyon
function getUnitLevel(unitId) {
    return unitLevelMap[unitId] || 0;
}

// Bir GSY'ye bağlı daireleri bulan fonksiyon
function getDepartmentsUnderGSY(gsyId) {
    return gsyDaireMap[gsyId] || [];
}

// Bir daireye bağlı müdürlükleri bulan fonksiyon
function getDirectoratesUnderDepartment(daireId) {
    return daireMudurlukMap[daireId] || [];
}

// Bir birimin bulunduğu hiyerarşik yolu bulan fonksiyon
function getUnitPath(unitId) {
    const path = [];
    let currentId = unitId;
    
    while (currentId) {
        path.unshift(currentId);
        currentId = getParentUnit(currentId);
    }
    
    return path;
}

// Belirli bir birim için yöneticileri bulan fonksiyon
function getManagersForUnit(unitId) {
    if (!managerData || managerData.length === 0) {
        return [];
    }
    
    return managerData.filter(manager => manager.id === unitId);
}

// Belirli bir birim için ana yöneticiyi bulan fonksiyon
function getMainManagerForUnit(unitId) {
    const managers = getManagersForUnit(unitId);
    
    // Pozisyon sıralamasına göre ilk yöneticiyi bul
    const positionPriority = ["Daire Başkanı", "Müdür", "Genel Sekreter Yardımcısı"];
    
    for (const position of positionPriority) {
        const manager = managers.find(m => m.pozisyon === position);
        if (manager) {
            return {
                name: manager["ad-soyad"] || "Bilgi Yok",
                position: manager.pozisyon,
                phone: manager.telefon || "Bilgi Yok",
                email: manager["e-posta"] || "Bilgi Yok"
            };
        }
    }
    
    // Eğer öncelikli pozisyonlarda yönetici yoksa, herhangi birini döndür
    if (managers.length > 0) {
        return {
            name: managers[0]["ad-soyad"] || "Bilgi Yok",
            position: managers[0].pozisyon,
            phone: managers[0].telefon || "Bilgi Yok",
            email: managers[0]["e-posta"] || "Bilgi Yok"
        };
    }
    
    // Hiç yönetici yoksa
    return {
        name: "Bilgi Yok",
        position: "Bilgi Yok",
        phone: "Bilgi Yok",
        email: "Bilgi Yok"
    };
}

// Belirli bir birim için yönetici yardımcılarını bulan fonksiyon
function getDeputyManagersForUnit(unitId) {
    const managers = getManagersForUnit(unitId);
    return managers.filter(m => m.pozisyon === "Müdür Yardımcısı");
}

// Organizasyon ağacını oluşturan fonksiyon
function buildOrganizationTree(data) {
    const orgTree = document.getElementById('orgTree');
    orgTree.innerHTML = ''; // Önce içeriği temizle
    
    data.forEach(item => {
        // Ana sekme oluştur
        const mainItem = createOrganizationItem(item, 'org-level-1');
        orgTree.appendChild(mainItem);
    });
}

// Organizasyon öğesi oluşturan fonksiyon
function createOrganizationItem(itemData, levelClass) {
    const orgItem = document.createElement('div');
    orgItem.className = 'org-item';
    
    // Header oluştur
    const header = document.createElement('div');
    header.className = `org-header ${levelClass}`;
    header.setAttribute('data-id', itemData.id);
    
    // Birim için ilgili yönetici bilgilerini al
    const manager = getMainManagerForUnit(itemData.id);
    
    // Yönetici bilgisi varsa
    if (manager && manager.name !== "Bilgi Yok") {
        header.setAttribute('data-title', itemData.title);
        header.setAttribute('data-mudur', manager.name);
        header.setAttribute('data-pozisyon', manager.position);
        header.setAttribute('data-tel', manager.phone);
        header.setAttribute('data-email', manager.email);
        
        // Alt öğeleri varsa ve müdürlük değilse (yani daire başkanlığı ise)
        if (itemData.children && itemData.children.length > 0 && manager.position !== "Müdür") {
            header.setAttribute('aria-expanded', 'false');
            
            // Header içeriğini oluştur - Başlık kısmı ve ikon kısmı ayrı işlem yapacak
            header.innerHTML = `
                <div class="icon-container"><i class="fas ${itemData.icon}"></i></div>
                <div class="title">${itemData.title}</div>
                <div class="manager-icon-container" title="Yönetici Bilgisi">
                    <i class="fas fa-user-tie"></i>
                </div>
            `;
            
            // Müdür ikonuna tıklanınca modal'ı açacak event listener
            const managerIcon = header.querySelector('.manager-icon-container');
            managerIcon.addEventListener('click', function(e) {
                e.stopPropagation(); // Header'a tıklama eventini engelle
                openManagerModal(itemData.id, itemData.title);
            });
            
            // Header'a tıklanınca içeriği açıp kapatacak event listener
            header.addEventListener('click', function() {
                toggleContent(this);
            });
        } 
        // Sadece müdür bilgisi olan (alt öğeleri olmayan) header
        else {
            // Header içeriğini oluştur - Sadece yönetici modalı gösterebilir
            header.innerHTML = `
                <div class="icon-container"><i class="fas ${itemData.icon}"></i></div>
                <div class="title">${itemData.title}</div>
                <div class="manager-icon-container"><i class="fas fa-user-tie"></i></div>
            `;
            
            // Tıklanınca modal'ı açacak event listener
            header.addEventListener('click', function() {
                openManagerModal(itemData.id, itemData.title);
            });
        }
    } 
    // Yönetici bilgisi yoksa veya "Bilgi Yok" ise (sadece kategorik bir başlık)
    else {
        header.setAttribute('aria-expanded', 'false');
        
        // Header içeriğini oluştur
        header.innerHTML = `
            <div class="icon-container"><i class="fas ${itemData.icon}"></i></div>
            <div class="title">${itemData.title}</div>
            <div><i class="fas fa-chevron-down"></i></div>
        `;
        
        // Alt öğeleri varsa, içerik açma/kapama için tıklama event listener'ı
        if (itemData.children && itemData.children.length > 0) {
            header.addEventListener('click', function() {
                toggleContent(this);
            });
        } else {
            // Alt öğeleri yoksa ve yönetici bilgisi de yoksa, yine de tıklanabilir
            header.addEventListener('click', function() {
                openManagerModal(itemData.id, itemData.title);
            });
        }
    }
    
    orgItem.appendChild(header);
    
    // Alt içerik bölümü
    if (itemData.children && itemData.children.length > 0) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'org-content';
        contentDiv.id = `content-${itemData.id}`;
        
        // Alt öğeleri oluştur
        itemData.children.forEach(child => {
            let childLevelClass;
            
            // Alt öğenin seviyesini belirle
            if (levelClass === 'org-level-1') {
                childLevelClass = 'org-level-2';
            } else if (levelClass === 'org-level-2') {
                childLevelClass = 'org-level-3';
            } else {
                childLevelClass = 'org-level-4';
            }
            
            // Alt grupları özyinelemeli olarak oluştur
            const childItem = createOrganizationItem(child, childLevelClass);
            contentDiv.appendChild(childItem);
        });
        
        orgItem.appendChild(contentDiv);
    }
    
    return orgItem;
}

// İçerik açma/kapama fonksiyonu
function toggleContent(headerElement) {
    // ID'ye göre içeriği bul
    const headerId = headerElement.getAttribute('data-id');
    const content = document.getElementById(`content-${headerId}`);
    
    // İçerik yoksa (son seviye), dönüş yap
    if (!content) return;
    
    // İçeriğin görünürlüğünü değiştir
    if (content.classList.contains('show')) {
        content.classList.remove('show');
        headerElement.setAttribute('aria-expanded', 'false');
        
        // Chevron ikonunu güncelle
        const chevron = headerElement.querySelector('.fa-chevron-down');
        if (chevron) {
            chevron.style.transform = 'rotate(0deg)';
        }
    } else {
        content.classList.add('show');
        headerElement.setAttribute('aria-expanded', 'true');
        
        // Chevron ikonunu güncelle
        const chevron = headerElement.querySelector('.fa-chevron-down');
        if (chevron) {
            chevron.style.transform = 'rotate(180deg)';
        }
    }
}

// Müdür modalını açan fonksiyon
function openManagerModal(unitId, unitTitle) {
    console.log("Modal açılıyor, birim ID:", unitId, "Başlık:", unitTitle);
    
    // Birim adını ayarla
    document.getElementById('modalBirimAdi').textContent = unitTitle;
    
    // Birim için ana yöneticiyi getir
    const manager = getMainManagerForUnit(unitId);
    console.log("Ana yönetici:", manager);
    
    // Ana yönetici bilgilerini modalda göster
    document.getElementById('modalMudurAdi').textContent = manager.name;
    document.getElementById('modalPozisyon').textContent = manager.position;
    document.getElementById('modalTelefon').textContent = manager.phone;
    document.getElementById('modalEmail').textContent = manager.email;
    
    // Birim hiyerarşisi bilgisi ekle
    const unitLevel = getUnitLevel(unitId);
    console.log("Birim seviyesi:", unitLevel);
    const hierarchyInfo = document.getElementById('modalHierarchyInfo');
    
    if (hierarchyInfo) {
        hierarchyInfo.innerHTML = '';
        
        // Hiyerarşi bilgisini ekle
        if (unitLevel === 3) { // Müdürlük seviyesi
            const daireId = getParentUnit(unitId);
            const gsyId = getParentUnit(daireId);
            
            if (daireId && gsyId) {
                const daireName = getBirimAdi(daireId);
                const gsyName = getBirimAdi(gsyId);
                
                hierarchyInfo.innerHTML = `
                    <small class="text-muted d-block">
                        <strong>Bağlı Olduğu Daire:</strong> ${daireName || 'Bilgi Yok'}
                    </small>
                    <small class="text-muted d-block">
                        <strong>Bağlı Olduğu GSY:</strong> ${gsyName || 'Bilgi Yok'}
                    </small>
                `;
            }
        } else if (unitLevel === 2) { // Daire seviyesi
            const gsyId = getParentUnit(unitId);
            
            if (gsyId) {
                const gsyName = getBirimAdi(gsyId);
                
                hierarchyInfo.innerHTML = `
                    <small class="text-muted d-block">
                        <strong>Bağlı Olduğu GSY:</strong> ${gsyName || 'Bilgi Yok'}
                    </small>
                `;
            }
        }
    }
    
    // Yardımcılar bölümünün gösterilip gösterilmeyeceğini belirle
    const deputySection = document.getElementById('deputySection');
    const deputyList = document.getElementById('deputyList');
    
    console.log("Pozisyon:", manager.position);
    console.log("Yardımcılar bölümü elementi:", deputySection);
    console.log("Yardımcılar listesi:", deputyList);
    
    // Eğer Daire Başkanı ise, yardımcılar bölümünü gizle
    if (manager.position === "Daire Başkanı" || manager.position === "Genel Sekreter Yardımcısı") {
        console.log("Daire Başkanı veya GSY, yardımcılar bölümü gizleniyor.");
        if (deputySection) {
            deputySection.style.display = 'none';
        }
    } else {
        console.log("Müdür pozisyonu, yardımcılar bölümü gösteriliyor.");
        // Daire Başkanı değilse, Müdür pozisyonu ise Müdür Yardımcılarını göster
        if (deputySection) {
            deputySection.style.display = 'block';
        }
        
        // Yardımcıları getir
        const deputies = getDeputyManagersForUnit(unitId);
        console.log("Bulunan yardımcılar:", deputies);
        
        // Yardımcılar listesini oluştur
        if (deputyList) {
            deputyList.innerHTML = ''; // Önce içeriği temizle
            
            // Eğer yardımcı varsa ekle
            if (deputies && deputies.length > 0) {
                console.log("Yardımcılar ekleniyor:", deputies.length);
                deputies.forEach(deputy => {
                    const listItem = document.createElement('div');
                    listItem.className = 'list-group-item';
                    listItem.innerHTML = `
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">${deputy["ad-soyad"] || "İsim Bilgisi Yok"}</h6>
                            <small>${deputy.pozisyon}</small>
                        </div>
                        <small class="text-muted">${deputy.telefon || "Telefon Bilgisi Yok"}</small>
                    `;
                    deputyList.appendChild(listItem);
                });
            } else {
                console.log("Yardımcı bulunamadı, bilgi mesajı ekleniyor.");
                // Yardımcı yoksa bilgi mesajı göster
                deputyList.innerHTML = '<div class="list-group-item">Müdür yardımcısı bilgisi bulunamadı.</div>';
            }
        } else {
            console.error("Deputy list elementi bulunamadı!");
        }
    }
    
    // Modal'ı aç
    const modal = new bootstrap.Modal(document.getElementById('mudurModal'));
    modal.show();
}

// Modal işlemleri için gerekli tanımlamaları yapan fonksiyon
function setupModalHandlers() {
    const mudurModal = document.getElementById('mudurModal');
    if (mudurModal) {
        mudurModal.addEventListener('hidden.bs.modal', function() {
            // Modal kapandığında temizlik işlemi
            document.getElementById('modalBirimAdi').textContent = '';
            document.getElementById('modalHierarchyInfo').innerHTML = '';
            document.getElementById('modalMudurAdi').textContent = '';
            document.getElementById('modalPozisyon').textContent = '';
            document.getElementById('modalTelefon').textContent = '';
            document.getElementById('modalEmail').textContent = '';
            document.getElementById('deputyList').innerHTML = '';
            
            // Yardımcılar bölümünü görünür yap (bir sonraki açılışta doğru şekilde değerlendirilecek)
            const deputySection = document.getElementById('deputySection');
            if (deputySection) {
                deputySection.style.display = 'block';
            }
        });
    }
}

// Arama işlemleri için event handler'ları kuran fonksiyon
function setupSearchHandlers() {
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    
    if (searchInput && clearSearch) {
        searchInput.addEventListener('input', function() {
            const searchText = this.value.toLowerCase().trim();
            
            if (searchText.length > 2) {
                performSearch(searchText);
            } else if (searchText.length === 0) {
                resetSearch();
            }
        });
        
        clearSearch.addEventListener('click', function() {
            searchInput.value = '';
            resetSearch();
        });
    }
}

// Arama işlemini gerçekleştiren fonksiyon
function performSearch(searchText) {
    const allHeaders = document.querySelectorAll('.org-header');
    let foundResults = false;
    
    // Önce tüm öğeleri gizle
    document.querySelectorAll('.org-item').forEach(item => {
        item.style.display = 'none';
    });
    
    // Tüm vurgulamaları kaldır
    document.querySelectorAll('.org-header .title').forEach(title => {
        title.innerHTML = title.textContent;
    });
    
    // Arama metnine uyan birimlerle birlikte yöneticilerin isimlerinde de ara
    allHeaders.forEach(header => {
        const title = header.querySelector('.title').textContent.toLowerCase();
        const unitId = header.getAttribute('data-id');
        const parent = header.closest('.org-item');
        
        // Birim adında ara
        const titleMatch = title.includes(searchText);
        
        // Yönetici adlarında ara
        let managerMatch = false;
        if (unitId) {
            const managers = getManagersForUnit(unitId);
            for (const manager of managers) {
                if (manager["ad-soyad"] && manager["ad-soyad"].toLowerCase().includes(searchText)) {
                    managerMatch = true;
                    break;
                }
            }
        }
        
        // Hem birim adında hem de yönetici adında arama yap
        if (titleMatch || managerMatch) {
            foundResults = true;
            
            // Bu öğeyi göster
            parent.style.display = 'block';
            
            // Eğer birim adı eşleşiyorsa metni vurgula
            if (titleMatch) {
                const titleEl = header.querySelector('.title');
                const highlightedText = titleEl.textContent.replace(
                    new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
                    match => `<span class="bg-warning">${match}</span>`
                );
                titleEl.innerHTML = highlightedText;
            }
            
            // Üst öğeleri göster
            showParentElements(parent);
        }
    });
    
    // Hiç sonuç bulunamadıysa bilgi ver
    if (!foundResults) {
        console.log("Sonuç bulunamadı.");
    }
}

// Üst öğeleri gösteren fonksiyon
function showParentElements(element) {
    let parent = element.parentElement;
    
    while (parent) {
        // Eğer bu bir içerik div'iyse göster
        if (parent.classList.contains('org-content')) {
            parent.classList.add('show');
            
            // İlgili başlığın expanded durumunu güncelle
            const parentItem = parent.parentElement;
            if (parentItem) {
                const parentHeader = parentItem.querySelector('.org-header');
                if (parentHeader) {
                    parentHeader.setAttribute('aria-expanded', 'true');
                }
            }
        }
        
        // Eğer bu bir org-item ise göster
        if (parent.classList.contains('org-item')) {
            parent.style.display = 'block';
        }
        
        // Bir üst seviyeye çık
        parent = parent.parentElement;
    }
}

// Aramayı sıfırlayan fonksiyon
function resetSearch() {
    // Tüm öğeleri göster
    document.querySelectorAll('.org-item').forEach(item => {
        item.style.display = 'block';
    });
    
    // Vurgulamaları kaldır
    document.querySelectorAll('.org-header .title').forEach(title => {
        title.innerHTML = title.textContent;
    });
    
    // Tüm açık içerikleri kapat
    document.querySelectorAll('.org-content.show').forEach(content => {
        content.classList.remove('show');
    });
    
    // Tüm başlıkların aria-expanded'ini false yap
    document.querySelectorAll('.org-header').forEach(header => {
        header.setAttribute('aria-expanded', 'false');
    });
}