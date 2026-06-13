# NIHAT BALIK RESTAURANT - QR MENÜ PROJESİ
## Claude Code Talimat Dosyası (PROJECT_RULES.md)

> Bu dosya, Claude Code'un bu proje üzerinde çalışırken **HER ZAMAN** referans alması gereken
> ana talimat dosyasıdır. Buradaki kurallar **hiçbir koşulda** atlanamaz, değiştirilemez veya
> yorumla esnetilemez. Her yeni görev/iterasyonda önce bu dosya okunmalı ve kurallara
> uyulduğundan emin olunmalıdır.

---

## 1. PROJE ÖZETİ

- **İşletme**: Nihat Balık Restaurant (deniz ürünleri / balık restoranı)
- **Domain**: nihatbalik.com
- **Amaç**: Tek bir QR kod ile açılan, mobil tarayıcıya birebir uyumlu, tek sayfalık
  (single-page) dijital menü sitesi.
- **Kullanım senaryosu**: Müşteri masada QR kodu telefonuyla okutur → tarayıcıda
  doğrudan menü açılır → kategoriler arasında gezinir → ürün görsellerini, isimlerini,
  açıklamalarını (TR/EN/AR) ve fiyatlarını görür.
- **Çıktı**: Statik web sitesi (HTML/CSS/JS veya Next.js gibi statik export edilebilir
  bir yapı). Backend / veritabanı gerekmez. Menü verisi tek bir JSON/JS dosyasında
  tutulur ki ileride fiyat/ürün güncellemesi kolay olsun.

---

## 2. ASLA İHLAL EDİLMEYECEK KURALLAR (HARD RULES)

1. **Mobile-first, mobile-only öncelik**: Tasarım önce 320px–480px ekran genişliği için
   yapılacak. Masaüstü görünümü ikincil önceliktir, bozulmaması yeterlidir ama
   optimize edilmesi şart değildir.
2. **Tek sayfa (Single Page) yapı**: Menü, sayfa yenilenmeden kategoriler arası geçiş
   yapılabilen tek bir HTML sayfası olacak (anchor/scroll veya tab tabanlı gezinme).
3. **Renk paleti logoya sadık kalacak**:
   - Ana arka plan: **siyah / koyu antrasit** (`#0A0A0A` – `#121212` aralığı)
   - Vurgu rengi 1 (lacivert): logo teknesi/yazı rengi `#1B3A5C` (yaklaşık)
   - Vurgu rengi 2 (kırmızı): logo "Nihat" yazı rengi `#C0392B` / `#B22222` (yaklaşık)
   - Metin rengi: beyaz / kırık beyaz `#F5F5F5`
   - İkincil/çerçeve detayları: altın/sarı tonu (mevcut fiziksel menüdeki gibi,
     opsiyonel - ince çizgiler/ayraçlar için kullanılabilir, ama logoya öncelik ver)
   - **Bu palet dışına çıkılmayacak.** Yeni bir renk eklenmeden önce mutlaka
     logodaki tonlarla uyumlu olup olmadığı kontrol edilecek.
4. **QR kod / kapak (cover) ekranı kuralı**:
   - QR kodun bastırılacağı/kullanılacağı kapak görseli veya yönlendirme ekranı
     **siyah arka plan** üzerine logo şeklinde olacak (mevcut logo zaten siyah
     zemin üzerine tasarlanmış, doğrudan kullanılabilir).
   - Menünün kendisi (QR okutulduktan sonra açılan sayfa) **siyah temalı** olacak.
   - Eğer ayrı bir "QR kartı / yönlendirme kartı" tasarlanırsa: **ön yüz siyah
     (logo + "Menüyü görüntülemek için QR kodu okutun" yazısı)**, **arka yüz
     beyaz** (QR kod beyaz zemin üzerine siyah/lacivert renkte, yüksek kontrast
     ve kolay taranabilirlik için) olacak. QR kodun kendisi her zaman yüksek
     kontrastlı (siyah üzerine beyaz değil; QR kodlar koyu kod + açık zemin
     formatında olmalı, taranabilirlik bozulmayacak).
5. **Görsel kullanımı**:
   - Balık ana yemek kategorisindeki **tüm ürünlerde fotoğraf zorunlu**.
   - Mezeler, ara sıcaklar, salatalar, tatlılar kategorilerinde elimizdeki
     fotoğraflar varsa kullanılacak.
   - İçecekler kategorisinde görsel **zorunlu değil**; sade liste (ürün adı +
     fiyat) yeterli. İstenirse marka logoları (Efes, Coca-Cola vb. gibi
     küçük ikonlar) kullanılabilir ama zorunlu değil.
   - Görseller mutlaka optimize edilecek (WebP veya sıkıştırılmış JPEG),
     `loading="lazy"` kullanılacak, sayfa açılış hızı yavaşlatılmayacak.
   - Tüm ürün görselleri aynı en-boy oranında kırpılacak/gösterilecek
     (kart düzeni tutarlılığı için - örn. 4:3 veya 1:1).
6. **Çok dilli içerik**: Mevcut fiziksel menüde TR / EN / AR üç dilli içerik var.
   - Birinci aşamada **Türkçe ana dil** olacak.
   - İngilizce açıklamalar ürün kartlarında küçük/ikincil yazı olarak
     gösterilebilir (TR başlık + EN alt başlık).
   - Arapça içerik şimdilik **eklenmeyecek**, ancak veri yapısı ileride
     dil ekleme kolay olacak şekilde (i18n uyumlu) kurgulanacak.
7. **Fiyat verisi netleşmeyen ürünler**: Fiyatı okunamayan/eksik olan ürünlerde
   fiyat alanı boş bırakılacak veya "Fiyat için personele danışınız" gibi bir
   notla gösterilecek. **Asla tahmini/uydurma fiyat yazılmayacak.**
8. **Performans**: Sayfa, mobil 4G bağlantıda hızlı açılmalı. Gereksiz
   kütüphane/framework yüklenmeyecek. Tercihen saf HTML/CSS/JS veya hafif bir
   statik site jeneratörü.
9. **Kod ve veri ayrımı**: Tüm menü içeriği (kategori, ürün adı, açıklama,
   fiyat, görsel yolu) tek bir veri dosyasında (`menu-data.json` veya
   `menu-data.js`) tutulacak. Tasarım kodu ile veri birbirine
   karıştırılmayacak - böylece restoran sahibi ileride sadece veri dosyasını
   güncelleyerek menüyü değiştirebilecek.
10. **Erişilebilirlik ve okunabilirlik**: Siyah arka plan üzerinde metin
    kontrastı WCAG AA seviyesini sağlayacak (beyaz/kırık beyaz metin, yeterli
    font boyutu - gövde metni min. 16px, kategori başlıkları daha büyük).

---

## 3. SAYFA YAPISI

```
[HEADER - sticky]
  - Logo (Nihat Balık Restaurant logosu, siyah zemin üzerinde)
  - (Opsiyonel) Kısa slogan / "Hoş Geldiniz"

[KATEGORİ NAVİGASYONU - sticky, yatay kaydırmalı]
  - Soğuk Mezeler
  - Ara Sıcaklar
  - Salatalar
  - Balıklar (Tava)
  - Balıklar (Izgara)
  - İçecekler
  - Tatlılar

[İÇERİK ALANI]
  Her kategori için:
  - Kategori başlığı (TR/EN)
  - Ürün kartları (görsel + isim + açıklama + fiyat)

[FOOTER]
  - İletişim bilgisi (opsiyonel, sonradan eklenecek)
  - "Nihat Balık Restaurant © 2026"
```

---

## 4. MENÜ VERİSİ (Fiziksel menüden çıkarılan içerik)

> Aşağıdaki veriler mevcut fiziksel menü fotoğraflarından okunmuştur. Fiyat veya
> isim okunamayan yerler `null` / belirtilmemiş olarak işaretlenmiştir. Görsel
> dosyaları (`/images/...`) restoran sahibi tarafından sağlanacak fotoğraflarla
> eşleştirilecektir (dosya adları proje başlangıcında placeholder olarak
> kullanılabilir).

### 4.1 Soğuk Mezeler / Cold Starters
| Ürün (TR) | EN | Fiyat (TL) | Görsel |
|---|---|---|---|
| Beyaz Peynir | White Cheese | 150 | var |
| Kavun | Melon | belirtilmemiş | var |
| Haydari | Haydari | 290 | var |
| Karides Söğüş | Sliced-boiled Shrimp | 600 | var |
| Fava | Fava | 290 | var |
| Ahtapot Salatası | Octopus Salad | 900 | var |
| Atom | Atom | 290 | var |
| Patlıcan Salatası | Eggplant Salad | 290 | var |
| Uskumru Marina | Mackerel Marina | 480 | var |
| Midye Dolma | Stuffed Mussels | belirtilmemiş | var |
| Levrek Marin | Sea Bass Marine | 480 | var |
| Deniz Börülcesi | Glasswort | 290 | var |

### 4.2 Ara Sıcaklar / Hot Appetizers
| Ürün (TR) | EN | Fiyat (TL) | Görsel |
|---|---|---|---|
| Kalamar Tava | Fried Calamari | 720 | var |
| Karides Güveç | Shrimp Casserole | 720 | var |
| Jumbo Karides | Jumbo Shrimps | 2500 | var |
| Balık Köftesi | Fish Rissole | 200 | var |
| Karides Tava | Fried Shrimp | belirtilmemiş | var |
| Tereyağında Karides Güveç | Shrimps Cooked in Butter | 720 | var |
| Balık Kokoreç | Minced Roasted Fish | 620 | var |
| Kalamar Dolma | Calamari with Stuffed | belirtilmemiş | var |
| Susamlı Levrek | Sesame Seabass | 300 | var |
| Deniz Mahsülleri Makarna | Seafood Pasta | 650 | var |

### 4.3 Salatalar / Salads
| Ürün (TR) | EN | Fiyat (TL) | Görsel |
|---|---|---|---|
| Çoban Salatası | Shepherd's Salad | 480 | var |
| Yeşil Salata | Green Salad | 480 | var |
| Peynirli Çoban Salatası | Shepherd's Salad with Cheese | 480 | var |
| Gavurdağı Salatası | Gavurdagi Salad | 480 | var |
| Roka Salatası | Garden Rocket Salad | 480 | var |
| Karides Salata | Shrimp Salad | 700 | var |

### 4.4 Balıklar - Tava (Fried Fish)
| Ürün (TR) | EN | Fiyat (TL) | Görsel |
|---|---|---|---|
| Kalkan Tava | Fried Turbot | 3800 | var |
| Mezgit Tava | Fried Whiting | 750 | var |
| Dil Tava | Sole Fish | belirtilmemiş | var |
| Palamut Tava | Fried Bonito | 2200 | var |
| Tekir Tava | Goat Fish (fried) | 1100 | var |
| Barbun Tava | Fried Red Mullet (Gold Fish) | 3400 | var |
| Hamsi Tava | Fried Anchovy | 650 | var |
| İstavrit Tava | Fried Mackerel (Horse Mackerel) | 750 | var |
| Balık Kavurma | Grilled/Sautéed Fish | 1100 | var |
| Pisi Balığı | Flounder | belirtilmemiş | var |

### 4.5 Balıklar - Izgara (Grilled Fish, genelde KG bazlı fiyatlandırma)
| Ürün (TR) | EN | Fiyat | Not |
|---|---|---|---|
| Izgara Çupra | Grilled Sea Bream | 2200 | KG bazlı |
| Izgara Levrek | Grilled Sea Bass | 2200 | KG bazlı |
| Izgara Somon | Grilled Salmon | 1050 | - |
| Lüfer | Bluefish | 3800 | KG bazlı |
| Sarıkanat | "Yellow Wing" Fish | 3200 | KG bazlı |
| Çinekop | Small Bluefish | 3200 | KG bazlı |
| Minekop | Minekop (fish) | belirtilmemiş | - |
| Sardalya Tava | Fried Sardine | belirtilmemiş | - |
| İthal Izgara Uskumru | Grilled (Imported) Mackerel | belirtilmemiş | - |
| Balık Şiş | Fish Skewers | 1100 | - |

> **Not**: "KG bazlı" ürünlerde fiyatın yanına "/kg" veya "kg fiyatıdır" notu
> eklenmeli, sabit porsiyon fiyatı gibi gösterilmemeli.

### 4.6 Tatlılar / Desserts
| Ürün (TR) | EN | Fiyat (TL) | Görsel |
|---|---|---|---|
| Mevsim Meyveleri | Seasonal Fruits | 400 | var |
| Ayva Tatlısı | Quince Dessert | 330 | var |
| Kabak Tatlısı | Pumpkin Dessert | belirsiz (okunamadı) | var |
| İncir Tatlısı | Fig Dessert | belirtilmemiş | var |
| Çikolatalı Süfle | Chocolate Soufflé | 350 | var |
| Dondurmalı İrmik Tatlısı | Semolina Dessert with Ice Cream | 270 | var |
| Tahinli Profiterol | Tahini Profiterole | belirsiz (okunamadı) | var |
| Ballı Muz | Banana with Honey | belirtilmemiş | var |
| Dondurma | Ice Cream | 200 | var |
| Kiremitte Helva | Halva Casserole | 230 | var |

### 4.7 İçecekler / Drinks (görsel zorunlu değil)
> Fiziksel menüdeki içecek listesi büyük ölçüde elle yazılmış ve fiyatların
> bir kısmı okunaksız/güncel değil. Bu yüzden başlangıçta sadece **kategori ve
> ürün isimleri** veri dosyasına eklenecek, fiyatlar restoran sahibi
> tarafından netleştirildikten sonra girilecek.

- **Bira / Beer**: Efes 33cl, Efes 50cl, Miller, Rakı (kadeh)
- **Rakılar**: Yeni Rakı, Efe Gold, Tekirdağ, Yeşil Efe, Saki vb. (70/50/35/20 cl seçenekleri)
- **Viskiler / Whiskey**: Black Label, Chivas Regal, J&B (70cl)
- **Vodkalar / Vodka**: Absolut, Smirnoff (70cl)
- **Şaraplar / Wine**: Selection, Yakut, Çankaya, Angora, Kayra, Sarafin Chardonnay, Buzbağ (70/35cl)
- **Soğuk İçecekler / Cold Drinks**: Kola, Fanta, Sprite, Ice Tea, Ayran, Şalgam/Turnip, Soda/Su

---

## 5. GÖRSEL VARLIKLAR

- **Logo**: `Nihat Balık Restaurant` logosu (siyah zemin, lacivert tekne/balıkçı
  figürü, kırmızı "Nihat" yazısı, lacivert "BALIK RESTAURANT" alt yazısı).
  Header'da ve QR yönlendirme ekranında kullanılacak.
- **Ürün fotoğrafları**: Restoran sahibi tarafından sağlanan/sağlanacak
  fotoğraflar (kavurma, kızartma balık çeşitleri, pisi/dil balığı, izgara
  levrek/çupra vb.) - dosya adlandırması: `kategori-urun-adi.jpg/webp`
  formatında düzenlenecek (örn. `balik-tava-kalkan.webp`).

---

## 6. CLAUDE CODE'A GENEL TALİMAT

Bu projeye başlarken / her görevde:

1. Önce bu `PROJECT_RULES.md` dosyasını oku ve Bölüm 2'deki kuralları kontrol et.
2. Menü verisini Bölüm 4'teki tabloları temel alarak `data/menu-data.json`
   dosyasına yapılandırılmış (kategori → ürün listesi → {isim_tr, isim_en,
   fiyat, birim, görsel, açıklama}) şekilde aktar.
3. Tasarımı Bölüm 3 (sayfa yapısı) ve Bölüm 2.3 (renk paleti) kurallarına göre
   kur. Mobil görünümü Chrome DevTools mobil simülasyonuyla (375px, 390px,
   414px genişlikler) test et.
4. Görseli olmayan ürünler için placeholder kullan, ancak placeholder'ın
   "görsel eklenecek" şeklinde belli olmasını sağla (kullanıcıyı yanıltma).
5. Her büyük değişiklikten sonra: bu dosyadaki kurallardan herhangi birinin
   ihlal edilip edilmediğini kontrol eden bir kısa öz-denetim yap (özellikle
   renk paleti, mobile-first, tek sayfa yapı, veri/kod ayrımı).
6. Kullanıcı yeni bir istek/değişiklik yaptığında, eğer bu istek Bölüm 2'deki
   kurallarla çelişiyorsa, **önce kullanıcıyı bilgilendir**, kuralı sessizce
   atlama veya değiştirme.

---

## 7. AÇIK SORULAR / SONRAKİ ADIMLAR

- Görsel dosyalarının (ürün fotoğrafları + logo) projeye eklenmesi
- İçecek fiyatlarının netleştirilmesi
- Okunamayan tatlı fiyatlarının (Kabak Tatlısı, Tahinli Profiterol) teyidi
- QR kodun yönlendireceği final URL'in belirlenmesi (örn. `https://nihatbalik.com/menu`)
- (Opsiyonel) İletişim bilgileri / çalışma saatleri / sosyal medya linkleri
