import React from 'react';
import App from './App';
import OhmCalculator from './ohmCalculator';
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import {Dropdown} from 'semantic-ui-react';
import {ABoptions} from './ohmCalculator';


//I struggled with the testing. I had and issue with creating mock functions and running those functions, I often got typescript
//errors complaining about the argument being null or undefined. With more time, I believe I could have figured that out. 

describe("ohmCalculator", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<OhmCalculator />);
    })

    it("should match the snapshot", () => {
        expect(wrapper).toMatchSnapshot();
      });

      describe("handleA", () => {
        it("should call setState on band A", () => {
          const mockEvent = {
              name: "bandA",
              value: 0
            };
            const expected = {
                bandA: 0,
              };

              wrapper.instance().handleA(mockEvent);
        
              expect(wrapper.state()).toEqual(expected);
        });
    })
});

  