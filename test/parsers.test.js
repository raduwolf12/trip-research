const test = require('node:test')
const assert = require('node:assert/strict')
const { traveldocHtmlToLines, stripHtmlToText, parseHeadingCategories, extractFreeToImportSection } = require('../server/index.js')._testUtils

test('stripHtmlToText removes tags and decodes entities', () => {
  assert.equal(stripHtmlToText('<p>Tea &amp; Coffee &mdash; 1&nbsp;kg</p>'), 'Tea & Coffee — 1 kg')
})

test('traveldocHtmlToLines keeps headings and list items as separate lines', () => {
  const html = '<h3>Prohibited</h3><ul><li>Firearms</li><li>Drugs</li></ul>'
  const lines = traveldocHtmlToLines(html)
  assert.deepEqual(lines, ['## Prohibited', '* Firearms', '* Drugs'])
})

test('parseHeadingCategories extracts label + list items per heading', () => {
  const html = '<h4>Alcohol</h4><ul><li>1L spirits</li><li>2L wine</li></ul><h4>Tobacco</h4><p>200 cigarettes</p>'
  const categories = parseHeadingCategories(html, 'h4')
  assert.deepEqual(categories, [
    { label: 'Alcohol', items: ['1L spirits', '2L wine'] },
    { label: 'Tobacco', items: ['200 cigarettes'] },
  ])
})

test('parseHeadingCategories skips headings with no label text', () => {
  const html = '<h4></h4><p>orphaned</p><h4>Currency</h4><p>Declare $10,000+</p>'
  const categories = parseHeadingCategories(html, 'h4')
  assert.deepEqual(categories, [{ label: 'Currency', items: ['Declare $10,000+'] }])
})

test('extractFreeToImportSection returns null when the heading is missing', () => {
  assert.equal(extractFreeToImportSection('<h3>Prohibited</h3><p>No guns</p>'), null)
})

test('extractFreeToImportSection parses a flat (no-EU-context) country page', () => {
  const html = '<h3>Free to Import</h3><h4>Alcohol</h4><p>1L spirits</p><h3>Prohibited</h3><p>Weapons</p>'
  const result = extractFreeToImportSection(html)
  assert.deepEqual(result, { groups: [{ context: null, categories: [{ label: 'Alcohol', items: ['1L spirits'] }] }] })
})

test('extractFreeToImportSection parses an EU-style page with h4 context + h5 categories', () => {
  const html = '<h3>Free to Import</h3>' +
    '<h4>When travelling within EU</h4><h5>Alcohol</h5><p>No fixed limit</p>' +
    '<h4>When travelling from outside the EU</h4><h5>Alcohol</h5><p>1L spirits</p>' +
    '<h3>Prohibited</h3>'
  const result = extractFreeToImportSection(html)
  assert.equal(result.groups.length, 2)
  assert.equal(result.groups[0].context, 'When travelling within EU')
  assert.equal(result.groups[1].context, 'When travelling from outside the EU')
})

test('extractFreeToImportSection returns null when the section has no parseable categories', () => {
  const html = '<h3>Free to Import</h3><p>Just a paragraph with no headings</p><h3>Prohibited</h3>'
  assert.equal(extractFreeToImportSection(html), null)
})
