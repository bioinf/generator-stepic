`import 'app/components/<%= slug_name %>/<%= slug_name %>'`
`import 'tests/tests_setup'`

component = null
moduleForComponent '<%= slug_name %>', '"<%= slug_name %>"" component',
  setup: ->
    component = @subject()
    @append()

  teardown: ->
    Em.run.next -> component.destroy()

test 'it renders', ->
  expect(1)
  equal(component._state, 'inDOM')
