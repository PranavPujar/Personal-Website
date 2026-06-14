export function computeGaussianKernelByRadius(radius) {
  const sigma = radius / 3;
  const kernel = [];
  let sum = 0;
  for (let i = 0; i <= radius; i++) {
    const weight = Math.exp(-0.5 * (i * i) / (sigma * sigma));
    kernel.push(weight);
    sum += i === 0 ? weight : weight * 2;
  }
  return kernel.map((w) => w / sum);
}
export function isChineseLanguage() {
  return navigator.language.startsWith("zh");
}
