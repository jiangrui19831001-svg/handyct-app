import { test, expect } from '@playwright/test';

test.describe('i18n 翻译系统测试', () => {
  test('首页默认显示中文', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    
    // 检查转换、验证、报告标签页
    const convertTab = await page.locator('text=转换').first();
    await expect(convertTab).toBeVisible();
    
    const validateTab = await page.locator('text=验证').first();
    await expect(validateTab).toBeVisible();
    
    const reportTab = await page.locator('text=报告').first();
    await expect(reportTab).toBeVisible();
    
    console.log('✓ 首页默认显示中文标签页');
  });

  test('切换到英文模式', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    
    // 点击语言切换器
    await page.click('button:has-text("中文")');
    await page.waitForTimeout(500);
    
    // 点击 English
    await page.click('text=English');
    await page.waitForTimeout(1000);
    
    // 检查英文标签页
    const convertTab = await page.locator('text=Convert').first();
    await expect(convertTab).toBeVisible();
    
    const validateTab = await page.locator('text=Validate').first();
    await expect(validateTab).toBeVisible();
    
    const reportTab = await page.locator('text=Report').first();
    await expect(reportTab).toBeVisible();
    
    console.log('✓ 成功切换到英文模式');
  });

  test('localStorage 正确保存语言偏好', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    
    // 切换到英文
    await page.click('button:has-text("中文")');
    await page.waitForTimeout(500);
    await page.click('text=English');
    await page.waitForTimeout(1000);
    
    // 检查 localStorage
    const langPref = await page.evaluate(() => localStorage.getItem('i18nextLng'));
    console.log(`✓ localStorage 中的语言设置: ${langPref}`);
    expect(langPref).toBe('en');
  });

  test('博客页面支持中英文切换', async ({ page }) => {
    await page.goto('http://localhost:5174/#/blog');
    
    // 检查中文标题
    const blogTitleZh = await page.locator('h1').first().textContent();
    console.log(`✓ 博客页面中文标题: ${blogTitleZh}`);
    expect(blogTitleZh).toContain('FDA');
    
    // 切换到英文
    await page.click('button:has-text("中文")');
    await page.waitForTimeout(500);
    await page.click('text=English');
    await page.waitForTimeout(1000);
    
    // 检查英文标题
    const blogTitleEn = await page.locator('h1').first().textContent();
    console.log(`✓ 博客页面英文标题: ${blogTitleEn}`);
    expect(blogTitleEn).toContain('FDA');
  });
});
