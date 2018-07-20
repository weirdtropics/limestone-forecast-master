/* eslint-disable */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import ThreeHourSummary from './ThreeHourSummary';

describe('ThreeHourSummary', () => {
  it('shoud render 4 <h4> tags', () => {
    const wrapper = shallow(
      <ThreeHourSummary />
    );
    expect(wrapper.find('.summary-data')).to.have.length(4);
  });

  it('should mount without props', () => {
    const wrapper = mount(
      <ThreeHourSummary />,
    );
    expect(wrapper).to.have.length(1);
  });
});
