// Organizasyon verilerini tanımla
const organizationData = [
    {
        id: "gsy3",
        title: "GENEL SEKRETER YARDIMCILIĞI-3",
        icon: "fa-sitemap",
        children: [
            {
                id: "kultur-daire",
                title: "KÜLTÜR DAİRESİ BAŞKANLIĞI",
                icon: "fa-landmark",
                manager: {
                    name: "Özgür Ceylan",
                    position: "Daire Başkanı",
                    phone: "0212 555 1100",
                    email: "ozgur.ceylan@belediye.gov.tr"
                },
                children: [
                    {
                        id: "kulturel-etkinlikler",
                        title: "KÜLTÜREL ETKİNLİKLER ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-theater-masks",
                        manager: {
                            name: "Ahmet Yılmaz",
                            position: "Şube Müdürü",
                            phone: "0212 555 1111",
                            email: "ahmet.yilmaz@belediye.gov.tr"
                        }
                    },
                    {
                        id: "orkestralar",
                        title: "ORKESTRALAR ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-music",
                        manager: {
                            name: "Ayşe Kaya",
                            position: "Şube Müdürü",
                            phone: "0212 555 1112",
                            email: "ayse.kaya@belediye.gov.tr"
                        }
                    },
                    {
                        id: "sehir-tiyatro",
                        title: "ŞEHİR TİYATROLARI ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-masks-theater",
                        manager: {
                            name: "Mehmet Demir",
                            position: "Şube Müdürü",
                            phone: "0212 555 1113",
                            email: "mehmet.demir@belediye.gov.tr"
                        }
                    },
                    {
                        id: "turizm",
                        title: "TURİZM ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-plane",
                        manager: {
                            name: "Zeynep Yıldız",
                            position: "Şube Müdürü",
                            phone: "0212 555 1114",
                            email: "zeynep.yildiz@belediye.gov.tr"
                        }
                    },
                    {
                        id: "dini-kurumlar",
                        title: "DİNİ KURUM VE TOPLULUKLARLA İLİŞKİLER ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-place-of-worship",
                        manager: {
                            name: "Ali Öztürk",
                            position: "Şube Müdürü",
                            phone: "0212 555 1115",
                            email: "ali.ozturk@belediye.gov.tr"
                        }
                    },
                    {
                        id: "stk-iliskileri",
                        title: "SİVİL TOPLUM KURULUŞLARI İLİŞKİLERİ ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-people-group",
                        manager: {
                            name: "Fatma Şahin",
                            position: "Şube Müdürü",
                            phone: "0212 555 1116",
                            email: "fatma.sahin@belediye.gov.tr"
                        }
                    }
                ]
            },
            {
                id: "kultur-varliklari",
                title: "KÜLTÜR VARLIKLARI DAİRESİ BAŞKANLIĞI",
                icon: "fa-monument",
                manager: {
                    name: "Bahar Erdem",
                    position: "Daire Başkanı",
                    phone: "0212 555 2100",
                    email: "bahar.erdem@belediye.gov.tr"
                },
                children: [
                    {
                        id: "koruma-uygulama",
                        title: "KORUMA UYGULAMA VE DENETİM ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-shield-alt",
                        manager: {
                            name: "Mustafa Yılmaz",
                            position: "Şube Müdürü",
                            phone: "0212 555 2111",
                            email: "mustafa.yilmaz@belediye.gov.tr"
                        }
                    },
                    {
                        id: "kultur-projeler",
                        title: "KÜLTÜR VARLIKLARI PROJELER ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-drafting-compass",
                        manager: {
                            name: "Hatice Çelik",
                            position: "Şube Müdürü",
                            phone: "0212 555 2112",
                            email: "hatice.celik@belediye.gov.tr"
                        }
                    },
                    {
                        id: "kulturel-miras",
                        title: "KÜLTÜREL MİRAS KORUMA ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-archway",
                        manager: {
                            name: "Kemal Turgut",
                            position: "Şube Müdürü",
                            phone: "0212 555 2113",
                            email: "kemal.turgut@belediye.gov.tr"
                        }
                    },
                    {
                        id: "kutuphane-muze",
                        title: "KÜTÜPHANE VE MÜZELER ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-book",
                        manager: {
                            name: "Elif Korkmaz",
                            position: "Şube Müdürü",
                            phone: "0212 555 2114",
                            email: "elif.korkmaz@belediye.gov.tr"
                        }
                    }
                ]
            },
            {
                id: "sosyal-hizmetler",
                title: "SOSYAL HİZMETLER DAİRESİ BAŞKANLIĞI",
                icon: "fa-hands-helping",
                manager: {
                    name: "Murat Akgün",
                    position: "Daire Başkanı",
                    phone: "0212 555 3100",
                    email: "murat.akgun@belediye.gov.tr"
                },
                children: [
                    {
                        id: "kadin-aile",
                        title: "KADIN VE AİLE HİZMETLERİ ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-female",
                        manager: {
                            name: "Sevgi Kılıç",
                            position: "Şube Müdürü",
                            phone: "0212 555 3111",
                            email: "sevgi.kilic@belediye.gov.tr"
                        }
                    },
                    {
                        id: "sosyal-hizmet",
                        title: "SOSYAL HİZMETLER ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-hand-holding-heart",
                        manager: {
                            name: "Emre Arslan",
                            position: "Şube Müdürü",
                            phone: "0212 555 3112",
                            email: "emre.arslan@belediye.gov.tr"
                        }
                    },
                    {
                        id: "cocuk-hizmetler",
                        title: "ÇOCUK HİZMETLERİ ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-child",
                        manager: {
                            name: "Sema Özkan",
                            position: "Şube Müdürü",
                            phone: "0212 555 3113",
                            email: "sema.ozkan@belediye.gov.tr"
                        }
                    },
                    {
                        id: "engelli-hizmetleri",
                        title: "ENGELLİ HİZMETLERİ ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-wheelchair",
                        manager: {
                            name: "Orhan Gül",
                            position: "Şube Müdürü",
                            phone: "0212 555 3114",
                            email: "orhan.gul@belediye.gov.tr"
                        }
                    },
                    {
                        id: "sehit-gazi",
                        title: "ŞEHİT YAKINLARI VE GAZİLERLE İLİŞKİLER ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-flag",
                        manager: {
                            name: "Hüseyin Doğan",
                            position: "Şube Müdürü",
                            phone: "0212 555 3115",
                            email: "huseyin.dogan@belediye.gov.tr"
                        }
                    }
                ]
            },
            {
                id: "muhtarlik-isleri",
                title: "MUHTARLIK İŞLERİ DAİRESİ BAŞKANLIĞI",
                icon: "fa-building-user",
                manager: {
                    name: "Ayşe Temel",
                    position: "Daire Başkanı",
                    phone: "0212 555 4100",
                    email: "ayse.temel@belediye.gov.tr"
                },
                children: [
                    {
                        id: "avrupa-muhtarlik",
                        title: "AVRUPA YAKASI MUHTARLIKLAR ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-map-marked-alt",
                        manager: {
                            name: "Selim Aydın",
                            position: "Şube Müdürü",
                            phone: "0212 555 4111",
                            email: "selim.aydin@belediye.gov.tr"
                        }
                    },
                    {
                        id: "muhtarlik-destek",
                        title: "MUHTARLIKLAR DESTEK HİZMETLERİ ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-handshake-angle",
                        manager: {
                            name: "Canan Şimşek",
                            position: "Şube Müdürü",
                            phone: "0212 555 4112",
                            email: "canan.simsek@belediye.gov.tr"
                        }
                    },
                    {
                        id: "anadolu-muhtarlik",
                        title: "ANADOLU YAKASI MUHTARLIKLAR ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-map-marked",
                        manager: {
                            name: "İbrahim Yıldırım",
                            position: "Şube Müdürü",
                            phone: "0212 555 4113",
                            email: "ibrahim.yildirim@belediye.gov.tr"
                        }
                    }
                ]
            }
        ]
    },
    {
        id: "gsy4",
        title: "GENEL SEKRETER YARDIMCILIĞI-4",
        icon: "fa-sitemap",
        children: [
            {
                id: "bogazici-imar",
                title: "BOĞAZİÇİ İMAR ŞUBE MÜDÜRLÜĞÜ",
                icon: "fa-bridge-water",
                manager: {
                    name: "Tolga Keskin",
                    position: "Şube Müdürü",
                    phone: "0212 555 5111",
                    email: "tolga.keskin@belediye.gov.tr"
                }
            },
            {
                id: "deprem-risk",
                title: "DEPREM RİSK YÖNETİMİ VE KENTSEL İYİLEŞTİRME DAİRESİ BAŞKANLIĞI",
                icon: "fa-house-crack",
                manager: {
                    name: "Serdar Yıldız",
                    position: "Daire Başkanı",
                    phone: "0212 555 6100",
                    email: "serdar.yildiz@belediye.gov.tr"
                },
                children: [
                    {
                        id: "deprem-zemin",
                        title: "DEPREM VE ZEMİN İNCELEME ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-microscope",
                        manager: {
                            name: "Metin Coşkun",
                            position: "Şube Müdürü",
                            phone: "0212 555 6111",
                            email: "metin.coskun@belediye.gov.tr"
                        }
                    },
                    {
                        id: "kentsel-donusum-uygulama",
                        title: "KENTSEL DÖNÜŞÜM UYGULAMA ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-city",
                        manager: {
                            name: "Banu Yücel",
                            position: "Şube Müdürü",
                            phone: "0212 555 6112",
                            email: "banu.yucel@belediye.gov.tr"
                        }
                    },
                    {
                        id: "kentsel-donusum-planlama",
                        title: "KENTSEL DÖNÜŞÜM PLANLAMA ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-compass-drafting",
                        manager: {
                            name: "Hakan Tekin",
                            position: "Şube Müdürü",
                            phone: "0212 555 6113",
                            email: "hakan.tekin@belediye.gov.tr"
                        }
                    }
                ]
            },
            {
                id: "imar-sehircilik",
                title: "İMAR VE ŞEHİRCİLİK DAİRESİ BAŞKANLIĞI",
                icon: "fa-building",
                manager: {
                    name: "Cengiz Toprak",
                    position: "Daire Başkanı",
                    phone: "0212 555 7100",
                    email: "cengiz.toprak@belediye.gov.tr"
                },
                children: [
                    {
                        id: "harita",
                        title: "HARİTA ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-map",
                        manager: {
                            name: "Serkan Özdemir",
                            position: "Şube Müdürü",
                            phone: "0212 555 7111",
                            email: "serkan.ozdemir@belediye.gov.tr"
                        }
                    },
                    {
                        id: "imar",
                        title: "İMAR ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-drafting-compass",
                        manager: {
                            name: "Nil Yaman",
                            position: "Şube Müdürü",
                            phone: "0212 555 7112",
                            email: "nil.yaman@belediye.gov.tr"
                        }
                    },
                    {
                        id: "planlama",
                        title: "PLANLAMA ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-layer-group",
                        manager: {
                            name: "Cem Kaya",
                            position: "Şube Müdürü",
                            phone: "0212 555 7113",
                            email: "cem.kaya@belediye.gov.tr"
                        }
                    },
                    {
                        id: "sehir-planlama",
                        title: "ŞEHİR PLANLAMA ŞUBE MÜDÜRLÜĞÜ",
                        icon: "fa-city",
                        manager: {
                            name: "Derya Ergin",
                            position: "Şube Müdürü",
                            phone: "0212 555 7114",
                            email: "derya.ergin@belediye.gov.tr"
                        }
                    }
                ]
            }
        ]
    }
];

// Organizasyon ağacını oluştur
document.addEventListener('DOMContentLoaded', function() {
    // Organizasyon verilerini alıp ağacı oluştur
    buildOrganizationTree(organizationData);
    
    // Modal işlemleri
    setupModalHandlers();
    
    // Arama işlemleri
    setupSearchHandlers();
});

// Organizasyon ağacını oluşturan fonksiyon
function buildOrganizationTree(data) {
    const orgTree = document.getElementById('orgTree');
    
    data.forEach(item => {
        // Ana sekme oluştur
        const mainItem = createOrganizationItem(item, 'org-level-1');
        orgTree.appendChild(mainItem);
    });
    
    // Dropdown işlemleri için event listener'ları ekle
    setupDropdownListeners();
}

// Organizasyon öğesi oluşturan fonksiyon
function createOrganizationItem(itemData, levelClass) {
    const orgItem = document.createElement('div');
    orgItem.className = 'org-item';
    
    // Header oluştur
    const header = document.createElement('div');
    header.className = `org-header ${levelClass}`;
    header.setAttribute('data-id', itemData.id);
    
    // Müdür bilgisi varsa
    if (itemData.manager) {
        header.setAttribute('data-title', itemData.title);
        header.setAttribute('data-mudur', itemData.manager.name);
        header.setAttribute('data-pozisyon', itemData.manager.position);
        header.setAttribute('data-tel', itemData.manager.phone);
        header.setAttribute('data-email', itemData.manager.email);
        
        // Alt öğeleri varsa ve "Şube Müdürü" değilse (yani Daire Başkanı ise)
        if (itemData.children && itemData.children.length > 0 && itemData.manager.position !== 'Şube Müdürü') {
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
                openManagerModal(header);
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
                openManagerModal(this);
            });
        }
    } 
    // Müdür bilgisi yoksa (sadece kategorik bir başlık)
    else {
        header.setAttribute('aria-expanded', 'false');
        
        // Header içeriğini oluştur
        header.innerHTML = `
            <div class="icon-container"><i class="fas ${itemData.icon}"></i></div>
            <div class="title">${itemData.title}</div>
            <div><i class="fas fa-chevron-down"></i></div>
        `;
        
        // İçerik açma/kapama için tıklama event listener'ı
        header.addEventListener('click', function() {
            toggleContent(this);
        });
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
function openManagerModal(element) {
    const title = element.getAttribute('data-title');
    const mudur = element.getAttribute('data-mudur');
    const pozisyon = element.getAttribute('data-pozisyon');
    const tel = element.getAttribute('data-tel');
    const email = element.getAttribute('data-email');
    
    document.getElementById('modalBirimAdi').textContent = title;
    document.getElementById('modalMudurAdi').textContent = mudur;
    document.getElementById('modalPozisyon').textContent = pozisyon;
    document.getElementById('modalTelefon').textContent = tel;
    document.getElementById('modalEmail').textContent = email;
    
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
            document.getElementById('modalMudurAdi').textContent = '';
            document.getElementById('modalPozisyon').textContent = '';
            document.getElementById('modalTelefon').textContent = '';
            document.getElementById('modalEmail').textContent = '';
        });
    }
}

// Dropdown işlemleri için event listener'ları ekleyen fonksiyon - Bu fonksiyon artık kullanılmıyor
// Çünkü yeni tıklama işlemleri toggleContent fonksiyonu ile yönetiliyor
function setupDropdownListeners() {
    // Gerekli değil - Silindi veya boş bırakıldı
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
    
    // Arama metnine uyan öğeleri bul ve göster
    allHeaders.forEach(header => {
        const title = header.querySelector('.title').textContent.toLowerCase();
        const parent = header.closest('.org-item');
        
        if (title.includes(searchText)) {
            foundResults = true;
            
            // Bu öğeyi göster
            parent.style.display = 'block';
            
            // Metni vurgula
            const titleEl = header.querySelector('.title');
            const highlightedText = titleEl.textContent.replace(
                new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
                match => `<span class="bg-warning">${match}</span>`
            );
            titleEl.innerHTML = highlightedText;
            
            // Üst öğeleri göster
            showParentElements(parent);
        }
    });
    
    // Hiç sonuç bulunamadıysa bilgi ver
    if (!foundResults) {
        // İsteğe bağlı: Sonuç bulunamadı mesajı göster
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
