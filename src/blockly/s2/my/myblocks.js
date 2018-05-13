'use strict';

// require('../../../config/robotList',function(){
//   console.log(k1);
// });
//自定义blockly
var GS = {};
GS.local = {};
// SY.hardware = 1;

var GS_language = function () {
  "use strict";
  var language =
    {
      en: 0,//english
      zh: 1,//中文
      fr: 2,//法语
      es: 3,//西班牙语
      ko: 4 //棒子
    };

  this.init = function () {
    //this.checkLanguage();
    //this.set(language.en);
  };

  this.checkLanguage = function () {
    let languageName = 'en';
    try {
      languageName = (navigator.languages == undefined) ? navigator.language : navigator.languages[0];
    } catch (e) {
      console.error(e);
    }
    var type = undefined;
    if (languageName.indexOf('en') > -1) {
      type = language.en;//english
    }
    else if (languageName.indexOf('zh') > -1) {
      type = language.zh; //chinese
    }
    else if (languageName.indexOf('ko') > -1) {
      type = language.ko;//korea
    } else if (languageName.indexOf('fr') > -1) {
      type = language.fr;
    } else if (languageName.indexOf('es') > -f) {
      type = language.es;
    }
    else {
      type = language.en;
    }
    console.log(type);
    this.set(1);
  };

  this.set = function (v) {
    if (v === language.zh) {
      GS.local = zh.data;
    }
    else if (v === language.en) {
      GS.local = en.data;
    } else if (v === language.ko) {
      GS.local = ko.data;

    } else if (v === language.fr) {
      GS.local = fr.data;
    } else if (v === language.es) {
      GS.local = es.data;
    } else {
      GS.local = en.data;
    }
  };
};

GS.init = function () {
  try {
    GS.language = new GS_language();
    GS.language.init();
    GS.MyBlocksInit();
  }
  catch (error) {
    console.error(error);
  }
};

GS.MyBlocksInit = function () {
  //event
  Blockly.Blocks['gs_event_whenflagclicked'] = {
    /**
     * from:event_whenflagclicked
     * Block for when flag clicked.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "id": "gs_event_whenflagclicked",
        "message0": LOCAL.gs_event_whenflagclicked,
        "args0": [
          {
            "type": "field_image",
            "src": Blockly.mainWorkspace.options.pathToMedia + "green-flag.svg",
            "width": 24,
            "height": 24,
            "alt": "flag"
          }
        ],
        "category": Blockly.Categories.event,
        "extensions": ["colours_event", "shape_hat"]
      });
    }
  };

  Blockly.Blocks['gs_event_whenthisspriteclicked'] = {
    /**
     * from:event_whenthisspriteclicked
     * Block for when this sprite clicked.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_event_whenthisspriteclicked,
        "category": Blockly.Categories.event,
        "extensions": ["colours_event", "shape_hat"]
      });
    }
  };

  //move
  Blockly.Blocks['gs_motion_move'] = {
    /**
     * from:motion_move
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_motion_move,
        "args0": [
          {
            "type": "input_value",
            "name": "LEFT"
          },
          {
            "type": "input_value",
            "name": "RIGHT"
          }
        ],
        "category": Blockly.Categories.motion,
        "extensions": ["colours_motion", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_motion_move_2'] = {
    /**
     * from:motion_move
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_motion_move_2,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
              [LOCAL.gs_motion_move_0_forward, '1'],
              [LOCAL.gs_motion_move_0_backward, '2'],
              [LOCAL.gs_motion_move_0_left, '3'],
              [LOCAL.gs_motion_move_0_right, '4'],
            ]
          },
          {
            "type": "input_value",
            "name": "SPEED"
          }
        ],
        "category": Blockly.Categories.motion,
        "extensions": ["colours_motion", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_motion_move_3'] = {
    /**
     * from:motion_move
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_motion_move_3,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "WHEEL",
            "options": [
              ['M1', '1'],
              ['M2', '2'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
              [LOCAL.gs_motion_move_0_forward, '1'],
              [LOCAL.gs_motion_move_0_backward, '2'],
              [LOCAL.gs_motion_move_0_left, '3'],
              [LOCAL.gs_motion_move_0_right, '4'],
            ]
          },
          {
            "type": "input_value",
            "name": "SPEED"
          }
        ],
        "category": Blockly.Categories.motion,
        "extensions": ["colours_motion", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_motion_steering_engine'] = {
    /**
     * from:motion_move
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_motion_steering_engine,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": gs_data_options_handle(SY.hardware[0], 1)
          },
          {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
              ['M1', '1'],
              ['M2', '2'],
              ['TWO', '0'],
            ]
          },
          {
            "type": "input_value",
            "name": "s1"
          },
          {
            "type": "input_value",
            "name": "s2"
          }
        ],
        "category": Blockly.Categories.motion,
        "extensions": ["colours_motion", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_motion_external_motor'] = {
    /**
     * from:motion_move
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_motion_external_motor,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_1, '1'],
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
              [LOCAL.gs_port_8, '8']
            ]
          },
          {
            "type": "input_value",
            "name": "s1"
          }
        ],
        "category": Blockly.Categories.motion,
        "extensions": ["colours_motion", "shape_statement"]
      });
    }
  };

  //light:
  Blockly.Blocks['gs_light_change'] = {
    /**
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_light_change,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "LIGHT",
            "options": [
              [LOCAL.gs_light_0_all, '2'],
              [LOCAL.gs_light_0_left, '0'],
              [LOCAL.gs_light_0_right, '1'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "COLOR",
            "options": [
              [LOCAL.gs_light_0_red, '#ff0000'],
              [LOCAL.gs_light_0_yellow, '#fffd14'],
              [LOCAL.gs_light_0_green, '#00ff00'],
              [LOCAL.gs_light_0_black, '#000000'],
            ]
          }
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_light_change_2'] = {
    /**
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_light_change_2,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "LIGHT",
            "options": [
              [LOCAL.gs_light_0_all, '2'],
              [LOCAL.gs_light_0_left, '0'],
              [LOCAL.gs_light_0_right, '1'],
            ]
          },
          {
            "type": "input_value",
            "name": "RED"
          },
          {
            "type": "input_value",
            "name": "GREEN"
          },
          {
            "type": "input_value",
            "name": "BLUE"
          }
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_light_change_3'] = {
    /**from:looks_say , pen_setpencolortocolor
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_light_change_3,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "LIGHT",
            "options": [
              [LOCAL.gs_light_0_all, '2'],
              [LOCAL.gs_light_0_left, '0'],
              [LOCAL.gs_light_0_right, '1'],
            ]
          },
          {
            "type": "input_value",
            "name": "COLOR"
          }
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_matrix_change'] = {
    /**
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
              [LOCAL.gs_matrix_change_VALUE1, '[0x0000,0x0000,0x3870,0x3870,0x0840,0x0000,0x0840,0x0780,0x0000,0x0000]'],
              [LOCAL.gs_matrix_change_VALUE2, '[0x0000,0x0000,0x0840,0x0480,0x0840,0x0300,0x0780,0x0840,0x0000,0x0000]'],
              [LOCAL.gs_matrix_change_VALUE3, '[0x0000,0x0000,0x1CE0,0x0000,0x0000,0x0FC0,0x0780,0X0300,0X0000,0X0000]'],
              [LOCAL.gs_matrix_change_VALUE4, '[0x0000,0x0000,0x1CE0,0X0000,0X0000,0X0300,0X0780,0X0300,0X0000,0X0000]'],
              [LOCAL.gs_matrix_change_VALUE5, '[0x0000,0x0000,0x0CC0,0X0CC0,0X0840,0X0000,0X0840,0X0780,0X0000,0X0000]'],
              [LOCAL.gs_matrix_change_VALUE6, '[0x0000,0x0000,0x0CC0,0X0CC0,0X0440,0x0000,0x0780,0x0300,0x0000,0x0000]'],
              [LOCAL.gs_matrix_change_VALUE7, '[0x0000,0x0000,0x0480,0x0480,0x0000,0x0000,0x0840,0x0780,0x0000,0x0000]'],
              [LOCAL.gs_matrix_change_VALUE8, '[0x0000,0x0000,0x14A0,0X0840,0X0000,0X0000,0X0780,0X0300,0X0000,0X0000]'],
            ]
          }
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_matrix_change_2'] = {
    /**
     * @TODO:显示画板
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change_2,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "input_value",
            "name": "VALUE"
          },
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_matrix_change_3'] = {
    /**
     * @TODO:显示画板
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change_3,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "input_value",
            "name": "VALUE"
          },
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_matrix_change_4'] = {
    /**
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change_4,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
              ['0', '0'],
              ['1', '1'],
              ['2', '2'],
              ['3', '3'],
              ['4', '4'],
              ['5', '5'],
              ['6', '6'],
              ['7', '7'],
              ['8', '8'],
              ['9', '9'],
            ]
          },
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_matrix_change_5'] = {
    /**
     * @TODO:输入文字
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change_5,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
              ['a', 'a'],
              ['b', 'b'],
              ['c', 'c'],
              ['d', 'd'],
              ['e', 'e'],
              ['f', 'f'],
              ['g', 'g'],
            ]
          },
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };
  Blockly.Blocks['gs_matrix_change_5A'] = {
    /**
     * @TODO:输入文字
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change_5,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
              ['h', 'h'],
              ['i', 'i'],
              ['j', 'j'],
              ['k', 'k'],
              ['l', 'l'],
              ['m', 'm'],
              ['n', 'n'],
            ]
          },
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };
  Blockly.Blocks['gs_matrix_change_5B'] = {
    /**
     * @TODO:输入文字
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change_5,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
              ['o', 'o'],
              ['p', 'p'],
              ['q', 'q'],
              ['r', 'r'],
              ['s', 's'],
              ['t', 't'],
            ]
          },
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };
  Blockly.Blocks['gs_matrix_change_5C'] = {
    /**
     * @TODO:输入文字
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change_5,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
              ['u', 'u'],
              ['v', 'v'],
              ['w', 'w'],
              ['x', 'x'],
              ['y', 'y'],
              ['z', 'z'],
            ]
          },
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_matrix_change_6'] = {
    /**
     * @TODO:输入文字
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change_5,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
              ['A', 'A'],
              ['B', 'B'],
              ['C', 'C'],
              ['D', 'D'],
              ['E', 'E'],
              ['F', 'F'],
              ['G', 'G'],
            ]
          },
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };
  Blockly.Blocks['gs_matrix_change_6A'] = {
    /**
     * @TODO:输入文字
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change_5,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
              ['H', 'H'],
              ['I', 'I'],
              ['J', 'J'],
              ['K', 'K'],
              ['L', 'L'],
              ['N', 'N'],
              ['M', 'M'],
            ]
          },
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };
  Blockly.Blocks['gs_matrix_change_6B'] = {
    /**
     * @TODO:输入文字
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change_5,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
              ['O', 'O'],
              ['P', 'P'],
              ['Q', 'Q'],
              ['R', 'R'],
              ['S', 'S'],
              ['T', 'T'],
            ]
          },
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };
  Blockly.Blocks['gs_matrix_change_6C'] = {
    /**
     * @TODO:输入文字
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change_5,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
              ['U', 'U'],
              ['V', 'V'],
              ['W', 'W'],
              ['X', 'X'],
              ['Y', 'Y'],
              ['Z', 'Z'],
            ]
          },
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_matrix_change_7'] = {
    /**
     * @TODO:输入文字
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change_5,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
              ['，', ','],
              ['!', '!'],
              ['@', '@'],
              ['?', '?'],
              ['。', '.'],
            ]
          },
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_matrix_change_8'] = {
    /**
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_matrix_change_2,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
              [LOCAL.gs_matrix_change_VALUE1, 'e1'],
              [LOCAL.gs_matrix_change_VALUE2, 'e2'],
              [LOCAL.gs_matrix_change_VALUE3, 'e3'],
              [LOCAL.gs_matrix_change_VALUE4, 'e4'],
              [LOCAL.gs_matrix_change_VALUE5, 'e5'],
              [LOCAL.gs_matrix_change_VALUE6, 'e6'],
              [LOCAL.gs_matrix_change_VALUE7, 'e7'],
              [LOCAL.gs_matrix_change_VALUE8, 'e8'],
            ]
          }
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_light_ultrasonic'] = {
    /**
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_light_ultrasonic,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "COLOR",
            "options": [
              [LOCAL.gs_light_0_red, '#ff0000'],
              [LOCAL.gs_light_0_yellow, '#fffd14'],
              [LOCAL.gs_light_0_green, '#00ff00'],
              [LOCAL.gs_light_0_black, '#000000'],
            ]
          }
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_light_ultrasonic_2'] = {
    /**
     * @TODO:输入文字
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_light_ultrasonic_2,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "input_value",
            "name": "RED"
          },
          {
            "type": "input_value",
            "name": "GREEN"
          },
          {
            "type": "input_value",
            "name": "BLUE"
          }
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_light_ultrasonic_3'] = {
    /**
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_light_ultrasonic_3,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "input_value",
            "name": "COLOR"
          },
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_light_ultrasonic_4'] = {
    /**
     * Block to change graphic effect.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_light_ultrasonic_3,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": [
              [LOCAL.gs_port_2, '2'],
              [LOCAL.gs_port_3, '3'],
              [LOCAL.gs_port_4, '4'],
              [LOCAL.gs_port_5, '5'],
              [LOCAL.gs_port_6, '6'],
              [LOCAL.gs_port_7, '7'],
            ]
          },
          {
            "type": "field_dropdown",
            "name": "COLOR",
            "options": [
              [LOCAL.gs_light_0_red, '#ff0000'],
              [LOCAL.gs_light_0_yellow, '#fffd14'],
              [LOCAL.gs_light_0_green, '#00ff00'],
              [LOCAL.gs_light_0_black, '#000000'],
            ]
          }
        ],
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "shape_statement"]
      });
    }
  };

  //sound
  Blockly.Blocks['gs_sound_play'] = {
    /**
     * Block to play a drum for some number of beats
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sound_play,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "SOUND",
            "options": [
              ['C5', '523'],
              ['D5', '587'],
              ['E5', '659'],
              ['F5', '698'],
              ['G5', '784'],
              ['A5', '880'],
              ['B5', '987']
            ]
          },
          {
            "type": "input_value",
            "name": "SECOND"
          }
        ],
        "category": Blockly.Categories.sound,
        "extensions": ["colours_sounds", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_sound_play_2'] = {
    /**
     * @TODO:
     * Block to play a drum for some number of beats
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sound_play_2,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "SOUND",
            "options": [
              ['C2', '65'],
              ['D2', '73'],
              ['E2', '82'],
              ['F2', '87'],
              ['G2', '98'],
              ['A2', '110'],
              ['B2', '124']
            ]
          },
          {
            "type": "field_dropdown",
            "name": "SECOND",
            "options": [
              [LOCAL.gs_sound_play_0_half, '500'],
              [LOCAL.gs_sound_play_0_quarter, '250'],
              [LOCAL.gs_sound_play_0_eighth, '125'],
              [LOCAL.gs_sound_play_0_whole, '1000'],
              [LOCAL.gs_sound_play_0_double, '2000'],
            ]
          },
        ],
        "category": Blockly.Categories.sound,
        "extensions": ["colours_sounds", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_sound_play_3'] = {
    /**
     * @TODO:
     * Block to play a drum for some number of beats
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sound_play_2,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "SOUND",
            "options": [
              ['C3', '131'],
              ['D3', '147'],
              ['E3', '165'],
              ['F3', '175'],
              ['G3', '196'],
              ['A3', '220'],
              ['B3', '247']
            ]
          },
          {
            "type": "field_dropdown",
            "name": "SECOND",
            "options": [
              [LOCAL.gs_sound_play_0_half, '500'],
              [LOCAL.gs_sound_play_0_quarter, '250'],
              [LOCAL.gs_sound_play_0_eighth, '125'],
              [LOCAL.gs_sound_play_0_whole, '1000'],
              [LOCAL.gs_sound_play_0_double, '2000'],
            ]
          },
        ],
        "category": Blockly.Categories.sound,
        "extensions": ["colours_sounds", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_sound_play_4'] = {
    /**
     * @TODO:
     * Block to play a drum for some number of beats
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sound_play_2,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "SOUND",
            "options": [
              ['C4', '262'],
              ['D4', '294'],
              ['E4', '330'],
              ['F4', '349'],
              ['G4', '392'],
              ['A4', '440'],
              ['B4', '494']
            ]
          },
          {
            "type": "field_dropdown",
            "name": "SECOND",
            "options": [
              [LOCAL.gs_sound_play_0_half, '500'],
              [LOCAL.gs_sound_play_0_quarter, '250'],
              [LOCAL.gs_sound_play_0_eighth, '125'],
              [LOCAL.gs_sound_play_0_whole, '1000'],
              [LOCAL.gs_sound_play_0_double, '2000'],
            ]
          },
        ],
        "category": Blockly.Categories.sound,
        "extensions": ["colours_sounds", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_sound_play_5'] = {
    /**
     * @TODO:
     * Block to play a drum for some number of beats
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sound_play_2,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "SOUND",
            "options": [
              ['C5', '523'],
              ['D5', '587'],
              ['E5', '659'],
              ['F5', '699'],
              ['G5', '784'],
              ['A5', '880'],
              ['B5', '988']
            ]
          },
          {
            "type": "field_dropdown",
            "name": "SECOND",
            "options": [
              [LOCAL.gs_sound_play_0_half, '500'],
              [LOCAL.gs_sound_play_0_quarter, '250'],
              [LOCAL.gs_sound_play_0_eighth, '125'],
              [LOCAL.gs_sound_play_0_whole, '1000'],
              [LOCAL.gs_sound_play_0_double, '2000'],
            ]
          },
        ],
        "category": Blockly.Categories.sound,
        "extensions": ["colours_sounds", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_sound_play_6'] = {
    /**
     * @TODO:
     * Block to play a drum for some number of beats
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sound_play_2,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "SOUND",
            "options": [
              ['C6', '1047'],
              ['D6', '1175'],
              ['E6', '1319'],
              ['F6', '1397'],
              ['G6', '1568'],
              ['A6', '1760'],
              ['B6', '1976']
            ]
          },
          {
            "type": "field_dropdown",
            "name": "SECOND",
            "options": [
              [LOCAL.gs_sound_play_0_half, '500'],
              [LOCAL.gs_sound_play_0_quarter, '250'],
              [LOCAL.gs_sound_play_0_eighth, '125'],
              [LOCAL.gs_sound_play_0_whole, '1000'],
              [LOCAL.gs_sound_play_0_double, '2000'],
            ]
          },
        ],
        "category": Blockly.Categories.sound,
        "extensions": ["colours_sounds", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_sound_play_7'] = {
    /**
     * @TODO:
     * Block to play a drum for some number of beats
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sound_play_2,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "SOUND",
            "options": [
              ['C7', '2093'],
              ['D7', '2349'],
              ['E7', '2637'],
              ['F7', '2794'],
              ['G7', '3136'],
              ['A7', '3520'],
              ['B7', '3951']
            ]
          },
          {
            "type": "field_dropdown",
            "name": "SECOND",
            "options": [
              [LOCAL.gs_sound_play_0_half, '500'],
              [LOCAL.gs_sound_play_0_quarter, '250'],
              [LOCAL.gs_sound_play_0_eighth, '125'],
              [LOCAL.gs_sound_play_0_whole, '1000'],
              [LOCAL.gs_sound_play_0_double, '2000'],
            ]
          },
        ],
        "category": Blockly.Categories.sound,
        "extensions": ["colours_sounds", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_sound_play_8'] = {
    /**
     * @TODO:
     * Block to play a drum for some number of beats
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sound_play_2,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "SOUND",
            "options": [
              ['C8', '4186'],
              ['D8', '4699'],
              ['E8', '5274'],
              ['F8', '5588'],
              ['G8', '6272'],
              ['A8', '7040'],
              ['B8', '7902']
            ]
          },
          {
            "type": "field_dropdown",
            "name": "SECOND",
            "options": [
              [LOCAL.gs_sound_play_0_half, '500'],
              [LOCAL.gs_sound_play_0_quarter, '250'],
              [LOCAL.gs_sound_play_0_eighth, '125'],
              [LOCAL.gs_sound_play_0_whole, '1000'],
              [LOCAL.gs_sound_play_0_double, '2000'],
            ]
          },
        ],
        "category": Blockly.Categories.sound,
        "extensions": ["colours_sounds", "shape_statement"]
      });
    }
  };

  //control
  Blockly.Blocks['gs_control_wait'] = {
    /**
     * Block to wait (pause) stack.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "id": "control_wait",
        "message0": LOCAL.gs_control_wait,
        "args0": [
          {
            "type": "input_value",
            "name": "DURATION"
          }
        ],
        "category": Blockly.Categories.control,
        "extensions": ["colours_control", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_control_repeat'] = {
    /**
     * Block for repeat n times (external number).
     * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#so57n9
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "id": "control_repeat",
        "message0": LOCAL.gs_control_repeat,
        "message1": "%1", // Statement
        "message2": "%1", // Icon
        "lastDummyAlign2": "RIGHT",
        "args0": [
          {
            "type": "input_value",
            "name": "TIMES"
          }
        ],
        "args1": [
          {
            "type": "input_statement",
            "name": "SUBSTACK"
          }
        ],
        "args2": [
          {
            "type": "field_image",
            "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
            "width": 24,
            "height": 24,
            "alt": "*",
            "flip_rtl": true
          }
        ],
        "category": Blockly.Categories.control,
        "extensions": ["colours_control", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_control_forever'] = {
    /**
     * Block for repeat n times (external number).
     * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#5eke39
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "id": "control_forever",
        "message0": LOCAL.gs_control_forever,
        "message1": "%1", // Statement
        "message2": "%1", // Icon
        "lastDummyAlign2": "RIGHT",
        "args1": [
          {
            "type": "input_statement",
            "name": "SUBSTACK"
          }
        ],
        "args2": [
          {
            "type": "field_image",
            "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
            "width": 24,
            "height": 24,
            "alt": "*",
            "flip_rtl": true
          }
        ],
        "category": Blockly.Categories.control,
        "extensions": ["colours_control", "shape_end"]
      });
    }
  };

  Blockly.Blocks['gs_control_repeat_until'] = {
    /**
     * Block for repeat until a condition becomes true.
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_control_repeat_until,
        "message1": "%1",
        "message2": "%1",
        "lastDummyAlign2": "RIGHT",
        "args0": [
          {
            "type": "input_value",
            "name": "CONDITION",
            "check": "Boolean"
          }
        ],
        "args1": [
          {
            "type": "input_statement",
            "name": "SUBSTACK"
          }
        ],
        "args2": [
          {
            "type": "field_image",
            "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
            "width": 24,
            "height": 24,
            "alt": "*",
            "flip_rtl": true
          }
        ],
        "category": Blockly.Categories.control,
        "extensions": ["colours_control", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_control_if'] = {
    /**
     * Block for if-then.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "type": "control_if",
        "message0": LOCAL.gs_control_if,
        "message1": "%1", // Statement
        "args0": [
          {
            "type": "input_value",
            "name": "CONDITION",
            "check": "Boolean"
          }
        ],
        "args1": [
          {
            "type": "input_statement",
            "name": "SUBSTACK"
          }
        ],
        "category": Blockly.Categories.control,
        "extensions": ["colours_control", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_control_if_else'] = {
    /**
     * Block for if-else.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "type": "control_if_else",
        "message0": LOCAL.gs_control_if,
        "message1": "%1",
        "message2": LOCAL.gs_control_if_else,
        "message3": "%1",
        "args0": [
          {
            "type": "input_value",
            "name": "CONDITION",
            "check": "Boolean"
          }
        ],
        "args1": [
          {
            "type": "input_statement",
            "name": "SUBSTACK"
          }
        ],
        "args3": [
          {
            "type": "input_statement",
            "name": "SUBSTACK2"
          }
        ],
        "category": Blockly.Categories.control,
        "extensions": ["colours_control", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_control_wait_until'] = {
    /**
     * Block to wait until a condition becomes true.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_control_wait_until,
        "args0": [
          {
            "type": "input_value",
            "name": "CONDITION",
            "check": "Boolean"
          }
        ],
        "category": Blockly.Categories.control,
        "extensions": ["colours_control", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_control_stop'] = {
    /**
     * Block for stop all scripts.
     * @this Blockly.Block
     */
    init: function () {
      var ALL_SCRIPTS = 'all';
      var THIS_SCRIPT = 'this script';
      var OTHER_SCRIPTS = 'other scripts in sprite';
      var stopDropdown = new Blockly.FieldDropdown(function () {
        if (this.sourceBlock_ &&
          this.sourceBlock_.nextConnection &&
          this.sourceBlock_.nextConnection.isConnected()) {
          return [
            ['other scripts in sprite', OTHER_SCRIPTS]
          ];
        }
        return [[LOCAL.gs_control_stop_all, ALL_SCRIPTS],
          //['this script', THIS_SCRIPT],
          //['other scripts in sprite', OTHER_SCRIPTS]
        ];
      }, function (option) {
        this.sourceBlock_.setNextStatement(option == OTHER_SCRIPTS);
      });
      this.appendDummyInput()
        .appendField(LOCAL.gs_control_stop)
        .appendField(stopDropdown, 'STOP_OPTION');
      this.setCategory(Blockly.Categories.control);
      this.setColour(Blockly.Colours.control.primary,
        Blockly.Colours.control.secondary,
        Blockly.Colours.control.tertiary
      );
      this.setPreviousStatement(true);
    },
    mutationToDom: function () {
      var container = document.createElement('mutation');
      var hasNext = (this.getFieldValue('STOP_OPTION') == 'other scripts in sprite');
      container.setAttribute('hasnext', hasNext);
      return container;
    },
    domToMutation: function (xmlElement) {
      var hasNext = (xmlElement.getAttribute('hasnext') == 'true');
      this.setNextStatement(hasNext);
    }
  };

  //运算
  Blockly.Blocks['gs_operator_add'] = {
    /**
     * Block for adding two numbers.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit(
        {
          "message0": "%1 +%2",
          "args0": [
            {
              "type": "input_value",
              "name": "NUM1"
            },
            {
              "type": "input_value",
              "name": "NUM2"
            }
          ],
          "category": Blockly.Categories.operators,
          "extensions": ["colours_operators", "output_number"]
        });
    }
  };

  Blockly.Blocks['gs_operator_subtract'] = {
    /**
     * Block for subtracting two numbers.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit(
        {
          "message0": "%1 -%2",
          "args0": [
            {
              "type": "input_value",
              "name": "NUM1"
            },
            {
              "type": "input_value",
              "name": "NUM2"
            }
          ],
          "category": Blockly.Categories.operators,
          "extensions": ["colours_operators", "output_number"]
        });
    }
  };

  Blockly.Blocks['gs_operator_multiply'] = {
    /**
     * Block for multiplying two numbers.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit(
        {
          "message0": "%1 *%2",
          "args0": [
            {
              "type": "input_value",
              "name": "NUM1"
            },
            {
              "type": "input_value",
              "name": "NUM2"
            }
          ],
          "category": Blockly.Categories.operators,
          "extensions": ["colours_operators", "output_number"]
        });
    }
  };

  Blockly.Blocks['gs_operator_divide'] = {
    /**
     * Block for dividing two numbers.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit(
        {
          "message0": "%1 /%2",
          "args0": [
            {
              "type": "input_value",
              "name": "NUM1"
            },
            {
              "type": "input_value",
              "name": "NUM2"
            }
          ],
          "category": Blockly.Categories.operators,
          "extensions": ["colours_operators", "output_number"]
        });
    }
  };

  Blockly.Blocks['gs_operator_random'] = {
    /**
     * Block for picking a random number.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit(
        {
          "message0": LOCAL.gs_operator_random,
          "args0": [
            {
              "type": "input_value",
              "name": "FROM"
            },
            {
              "type": "input_value",
              "name": "TO"
            }
          ],
          "category": Blockly.Categories.operators,
          "extensions": ["colours_operators", "output_number"]
        });
    }
  };

  Blockly.Blocks['gs_operator_lt'] = {
    /**
     * Block for less than comparator.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": "%1 <%2",
        "args0": [
          {
            "type": "input_value",
            "name": "OPERAND1"
          },
          {
            "type": "input_value",
            "name": "OPERAND2"
          }
        ],
        "category": Blockly.Categories.operators,
        "extensions": ["colours_operators", "output_boolean"]
      });
    }
  };

  Blockly.Blocks['gs_operator_equals'] = {
    /**
     * Block for equals comparator.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": "%1 =%2",
        "args0": [
          {
            "type": "input_value",
            "name": "OPERAND1"
          },
          {
            "type": "input_value",
            "name": "OPERAND2"
          }
        ],
        "category": Blockly.Categories.operators,
        "extensions": ["colours_operators", "output_boolean"]
      });
    }
  };

  Blockly.Blocks['gs_operator_gt'] = {
    /**
     * Block for greater than comparator.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": "%1 >%2",
        "args0": [
          {
            "type": "input_value",
            "name": "OPERAND1"
          },
          {
            "type": "input_value",
            "name": "OPERAND2"
          }
        ],
        "category": Blockly.Categories.operators,
        "extensions": ["colours_operators", "output_boolean"]
      });
    }
  };

  Blockly.Blocks['gs_operator_and'] = {
    /**
     * Block for "and" boolean comparator.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": "%1 and%2",
        "args0": [
          {
            "type": "input_value",
            "name": "OPERAND1",
            "check": "Boolean"
          },
          {
            "type": "input_value",
            "name": "OPERAND2",
            "check": "Boolean"
          }
        ],
        "category": Blockly.Categories.operators,
        "extensions": ["colours_operators", "output_boolean"]
      });
    }
  };

  Blockly.Blocks['gs_operator_or'] = {
    /**
     * Block for "or" boolean comparator.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": "%1 or%2",
        "args0": [
          {
            "type": "input_value",
            "name": "OPERAND1",
            "check": "Boolean"
          },
          {
            "type": "input_value",
            "name": "OPERAND2",
            "check": "Boolean"
          }
        ],
        "category": Blockly.Categories.operators,
        "extensions": ["colours_operators", "output_boolean"]
      });
    }
  };

  Blockly.Blocks['gs_operator_not'] = {
    /**
     * Block for "not" unary boolean operator.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": "not%1",
        "args0": [
          {
            "type": "input_value",
            "name": "OPERAND",
            "check": "Boolean"
          }
        ],
        "category": Blockly.Categories.operators,
        "extensions": ["colours_operators", "output_boolean"]
      });
    }
  };

  //传感器
  Blockly.Blocks['gs_sensing_mousedown'] = {
    /**
     * Block to Report if the mouse is down.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sensing_mousedown,
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_sensing", "output_boolean"]
      });
    }
  };

  //停止移动
  Blockly.Blocks['gs_motion_stopMove'] = {
    /**
     * Block to Report if the mouse is down.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_motion_stopMove,
        "category": Blockly.Categories.motion,
        "extensions": ["colours_motion", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_sensing_distanceto'] = {
    /**
     * Block to Report distance to another Object.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sensing_distanceto,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": gs_data_options_handle(SY.hardware[0], 2)
          },
        ],
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_sensing", "output_number"]
      });
    }
  };

  // 获取巡线数值
  Blockly.Blocks['gs_sensing_linePatrolValue'] = {
    /**
     * Block to Report distance to another Object.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sensing_linePatrolValue,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": gs_data_options_handle(SY.hardware[0], 2)
          },
        ],
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_sensing", "output_number"]
      });
    }
  };

  // 获取光线数值
  Blockly.Blocks['gs_sensing_lightValue'] = {
    /**
     * Block to Report distance to another Object.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sensing_lightValue,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": gs_data_options_handle(SY.hardware[0], 2)
          },
        ],
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_sensing", "output_number"]
      });
    }
  };

  // 获取声音数值
  Blockly.Blocks['gs_sensing_voiceValue'] = {
    /**
     * Block to Report distance to another Object.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sensing_voiceValue,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": gs_data_options_handle(SY.hardware[0], 3)
          },
        ],
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_sensing", "output_number"]
      });
    }
  };

  // 获取温度数值
  Blockly.Blocks['gs_sensing_temperatureValue'] = {
    /**
     * Block to Report distance to another Object.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sensing_temperatureValue,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": gs_data_options_handle(SY.hardware[0], 2)
          },
        ],
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_sensing", "output_number"]
      });
    }
  };

  // 获取湿度数值
  Blockly.Blocks['gs_sensing_humidityValue'] = {
    /**
     * Block to Report distance to another Object.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_sensing_humidityValue,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "PORT",
            "options": gs_data_options_handle(SY.hardware[0], 2)
          },
        ],
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_sensing", "output_number"]
      });
    }
  };

  //变量
  Blockly.Blocks['gs_data_variable'] = {
    /**
     * Block to set variable to a certain value
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": "%1 ",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "VARIABLE2",
            "options": [
              [LOCAL.gs_data_variable_a, 'VA'],
              [LOCAL.gs_data_variable_b, 'VB'],
              [LOCAL.gs_data_variable_c, 'VC'],
              [LOCAL.gs_data_variable_d, 'VD'],
              [LOCAL.gs_data_variable_e, 'VE'],
            ]
          },
        ],
        "category": Blockly.Categories.data,
        "extensions": ["colours_data", "output_string"]
      });
    }
  };

  Blockly.Blocks['gs_data_setvariableto'] = {
    /**
     * Block to set variable to a certain value
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_data_setvariableto,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "VARIABLE2",
            "options": [
              [LOCAL.gs_data_variable_a, 'VA'],
              [LOCAL.gs_data_variable_b, 'VB'],
              [LOCAL.gs_data_variable_c, 'VC'],
              [LOCAL.gs_data_variable_d, 'VD'],
              [LOCAL.gs_data_variable_e, 'VE'],
            ]
          },
          {
            "type": "input_value",
            "name": "VALUE"
          }
        ],
        "category": Blockly.Categories.data,
        "extensions": ["colours_data", "shape_statement"]
      });
    }
  };

  Blockly.Blocks['gs_data_changevariableby'] = {
    /**
     * Block to change variable by a certain value
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": LOCAL.gs_data_changevariableby,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "VARIABLE2",
            "options": [
              [LOCAL.gs_data_variable_a, 'VA'],
              [LOCAL.gs_data_variable_b, 'VB'],
              [LOCAL.gs_data_variable_c, 'VC'],
              [LOCAL.gs_data_variable_d, 'VD'],
              [LOCAL.gs_data_variable_e, 'VE'],
            ]
          },
          {
            "type": "input_value",
            "name": "VALUE"
          }
        ],
        "category": Blockly.Categories.data,
        "extensions": ["colours_data", "shape_statement"]
      });
    }
  };
  function gs_data_options_handle(ki, j) {
    if (ki == 1) {
      if (j === 1) { //舵机
        return [
          [LOCAL.gs_port_1, '1'],
          [LOCAL.gs_port_8, '8'],
        ]
      } else if (j == 2) {//
        return [
          [LOCAL.gs_port_2, '2'],
          [LOCAL.gs_port_3, '3'],
          [LOCAL.gs_port_4, '4'],
          [LOCAL.gs_port_5, '5'],
          [LOCAL.gs_port_6, '6'],
          [LOCAL.gs_port_7, '7']];
      }else if(j === 3){
        return [
          [LOCAL.gs_port_2, '2'],
          [LOCAL.gs_port_3, '3'],
          [LOCAL.gs_port_4, '4'],
          [LOCAL.gs_port_5, '5'],
          [LOCAL.gs_port_6, '6'],
          [LOCAL.gs_port_7, '7']];
      }


    } else if (ki == 2) {
      if (j === 1) { //舵机
        return [[LOCAL.gs_port_4, '4']]
      } else if (j == 2) {//
        return [
          [LOCAL.gs_port_1, '1'],
          [LOCAL.gs_port_2, '2'],
          [LOCAL.gs_port_3, '3'],
        ]
      }else if(j=== 3){//声音传感器
        return [
          [LOCAL.gs_port_1, '1'],
          [LOCAL.gs_port_2, '2'],
          [LOCAL.gs_port_3, '3'],
        ]
      }
    } else {
      return [
        [LOCAL.gs_port_1, '1'],
        [LOCAL.gs_port_2, '2'],
        [LOCAL.gs_port_3, '3'],
        [LOCAL.gs_port_4, '4'],
        [LOCAL.gs_port_5, '5'],
        [LOCAL.gs_port_6, '6'],
        [LOCAL.gs_port_7, '7'],
        [LOCAL.gs_port_8, '8'],
      ]
    }
  }
};

GS.init();