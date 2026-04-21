const { test, expect } = require('@playwright/test');

test('Ordenar productos por precio ascendente', async ({ page }) => {

  await page.goto('https://sauce-demo.myshopify.com/collections/all');

  // Esperar productos visibles
  const priceLocator = page.locator('.price');
  await expect(priceLocator.first()).toBeVisible();

  // Seleccionar orden
  await page.selectOption('select', { label: 'Price, low to high' });

  // Esperar cambio en DOM (mejor práctica)
  await page.waitForLoadState('networkidle');

  // Obtener precios
  const prices = await priceLocator.allTextContents();

  const numericPrices = prices.map(p =>
    parseFloat(p.replace('$', '').trim())
  );

  // Validar orden ascendente
  const sorted = [...numericPrices].sort((a, b) => a - b);

  expect(numericPrices).toEqual(sorted);
});