import { Form, Text } from 'react-form';

const validate = value => ({
  error: !value || !/Hello World/.test(value) ? "Input must contain 'Hello World'" : null,
  warning: !value || !/^Hello World$/.test(value) ? "Input should equal just 'Hello World'" : null,
  success: value && /Hello World/.test(value) ? "Thanks for entering 'Hello World'!" : null
})

const customerForm = props => (
<Form>
  {formApi => (
    <form onSubmit={formApi.submitForm} id="form1" className="mb-4">
      <label htmlFor="hello">Hello World</label>
      <Text field="hello" id="hello" validate={validate} />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )}
</Form>
);

export default customerForm;