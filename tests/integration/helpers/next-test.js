import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('next', 'Integration | Helper | {{next}}', {
  integration: true
});

test('It returns the next value in an array of non-primitive values', function(assert) {
  this.set('array', emberArray([
    { name: 'a' },
    { name: 'b' },
    { name: 'c' }
  ]));

  this.set('value', { name: 'b' });
  this.set('useDeepEqual', true);

  this.render(hbs`
    {{~#with (next value useDeepEqual array) as |item|~}}
      {{~item.name~}}
    {{~/with~}}
  `);

  assert.equal(this.$().text().trim(), 'c', 'c is shown');
});

test('It returns the next value in an array of primitive values', function(assert) {
  this.set('array', emberArray(['lemon', 'kiwi', 'peach']));

  this.set('value', 'lemon');

  this.render(hbs`
    {{~#with (next value array) as |item|~}}
      {{~item~}}
    {{~/with~}}
  `);

  assert.equal(this.$().text().trim(), 'kiwi', 'kiwi is shown');
});

test('It recomputes if array changes', function(assert) {
  this.set('array', emberArray([1, 2, 3]));

  this.render(hbs`
    {{~#with (next 1 array) as |item|~}}
      {{~item~}}
    {{~/with~}}
  `);

  assert.equal(this.$().text().trim(), 2, '2 is shown');

  run(() => this.set('array', [2, 1, 3]));

  assert.equal(this.$().text().trim(), 3, '3 is added and shown');
});
