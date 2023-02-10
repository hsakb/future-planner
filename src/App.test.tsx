import { render, screen } from '@testing-library/react';
import App, { generateDataBySettings, generateGridData } from 'App';
import React from 'react';

describe('AppのUT', () => {
  test('45歳の場合に55～100歳の56件の配列が返されること', () => {
    const result = generateGridData(45, 100, 100)
    expect(result.length).toBe(56)
  })
  test('戻り値の1つ目の要素が渡した値と一致すること', () => {
    const result = generateGridData(25, 3000000, 500000)
    expect(result[0]['id']).toBe(25)
    expect(result[0]['annual_income']).toBe(3000000)
    expect(result[0]['savings']).toBe(1500000)
  })
  test('45歳の場合に55～100歳の56件の配列が返されること', () => {
    const result = generateDataBySettings(
      { age: 45, annual_income: 100, annual_expenditure: 100, savings: 100 })
    expect(result.length).toBe(56)
  })
  test('戻り値の1つ目の要素が渡した値と一致すること', () => {
    const result = generateDataBySettings(
      { age: 45, annual_income: 100, annual_expenditure: 100, savings: 100 })
    expect(result[0]['id']).toBe(45)
    expect(result[0]['annual_income']).toBe(100)
    expect(result[0]['annual_expenditure']).toBe(100)
    expect(result[0]['savings']).toBe(100)
  })
})

describe('AppのComponentテスト', () => {
  test('renders App component', () => {
    render(<App />);

    expect(screen.getByText('入力者')).toBeInTheDocument()
  })
})
