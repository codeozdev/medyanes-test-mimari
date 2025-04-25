/**
 * Tarih formatlaması için yardımcı fonksiyon
 * @param {Date|string} date - Tarih objesi veya ISO formatında tarih string'i
 * @returns {string} - Formatlanmış tarih string'i (örn: "30.04.2023")
 */
export function formatDate(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("tr-TR");
}

/**
 * Para birimi formatlaması için yardımcı fonksiyon
 * @param {number|string} amount - Para miktarı
 * @param {string} currency - Para birimi (default: "₺")
 * @returns {string} - Formatlanmış para birimi string'i (örn: "99,90 ₺")
 */
export function formatCurrency(amount, currency = "₺") {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  return `${numAmount.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${currency}`;
}

/**
 * Metin kısaltma için yardımcı fonksiyon
 * @param {string} text - Kısaltılacak metin
 * @param {number} maxLength - Maksimum uzunluk
 * @returns {string} - Kısaltılmış metin
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Slug oluşturma için yardımcı fonksiyon
 * @param {string} text - Slug'a dönüştürülecek metin
 * @returns {string} - Slug formatında metin
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

/**
 * Kredi kartı numarası maskeleme yardımcı fonksiyon
 * @param {string} cardNumber - Kredi kartı numarası
 * @returns {string} - Maskelenmiş kredi kartı numarası (örn: "4*** **** **** 1234")
 */
export function maskCardNumber(cardNumber) {
  if (!cardNumber) return "";
  // Remove non-numeric characters
  const onlyNumbers = cardNumber.replace(/\D/g, "");
  // Get the last 4 digits
  const lastFour = onlyNumbers.slice(-4);
  // Mask the rest
  return `${onlyNumbers.charAt(0)}*** **** **** ${lastFour}`;
}
