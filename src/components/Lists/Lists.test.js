import React from 'react'
import { shallow } from 'enzyme'

import List from './List/List'
import Lists from './Lists'

// Testing using Enzyme
describe('Testing Lists', () => {
    test('should have un-ordered lists wrapper', () => {
        const wrapper = shallow(<Lists />);
        
        expect(wrapper.find('.lists')).toHaveLength(1)
    })

    test('renders three <List /> components', () => {
        const wrapper = shallow(<Lists />);
        
        expect(wrapper.find(List)).toHaveLength(3)
    })
})