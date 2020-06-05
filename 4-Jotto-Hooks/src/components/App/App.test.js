import React from 'react'
import App from './App'
import { mount } from 'enzyme'
import { findByTestAttr } from '../../test/testUtils'
import hookActions from '../../actions/hookActions'

const mockGetSecretWord = jest.fn()

const setup = () => {
  mockGetSecretWord.mockClear()
  hookActions.getSecretWord = mockGetSecretWord

  // NOTE: `useEffect` works on `mount` and not `shallow`
  // SEE: https://github.com/enzymejs/enzyme/issues/2086
  return mount(<App />)
}

describe('App components', () => {
  test('should render the App component without any errors', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-app')
    expect(component.length).toBe(1)
  })

  test('should getSecretWord get called on App mount', () => {
    setup()
    expect(mockGetSecretWord).toHaveBeenCalled()
  })

  test('should not update the secretWord on App update', () => {
    const wrapper = setup()
    mockGetSecretWord.mockClear()

    // NOTE: wrapper.update() doesn not trigger update
    // SEE: https://github.com/enzymejs/enzyme/issues/2091
    wrapper.setProps()

    expect(mockGetSecretWord).not.toHaveBeenCalled()
  })
})
