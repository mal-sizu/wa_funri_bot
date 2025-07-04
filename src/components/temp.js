const form = 
{
  "version": "7.1",
  "screens": [
    {
      "id": "client_data",
      "title": "Customer Details",
      "data": {},
      "layout": {
        "type": "SingleColumnLayout",
        "children": [
          {
            "type": "Form",
            "name": "client_data_form",
            "children": [
              {
                "type": "TextInput",
                "label": "Full Name",
                "name": "full_name",
                "required": true,
                "input_type": "text",
                "helper_text": "Full Name | සම්පූර්ණ නම"
              },
              {
                "type": "TextArea",
                "label": "Address",
                "name": "address",
                "required": true,
                "helper_text": "Address | ලිපිනය"
              },
              {
                "type": "TextInput",
                "label": "City",
                "name": "city",
                "required": true,
                "input_type": "text",
                "helper_text": "City | ආසන්නතම නගරය"
              },
              {
                "type": "Dropdown",
                "label": "District",
                "name": "district",
                "required": true,
                "data_source": [
                  { "id": "Colombo", "title": "Colombo - කොළඹ" },
                  { "id": "Gampaha", "title": "Gampaha - ගම්පහ" },
                  { "id": "Kalutara", "title": "Kalutara - කළුතර" },
                  { "id": "Kandy", "title": "Kandy - මහනුවර" },
                  { "id": "Matale", "title": "Matale - මාතලේ" },
                  { "id": "Nuwara Eliya", "title": "Nuwara Eliya - නුවර එළිය" },
                  { "id": "Galle", "title": "Galle - ගාල්ල" },
                  { "id": "Matara", "title": "Matara - මාතර" },
                  { "id": "Hambantota", "title": "Hambantota - හම්බන්තොට" },
                  { "id": "Jaffna", "title": "Jaffna - යාපනය" },
                  { "id": "Kilinochchi", "title": "Kilinochchi - කිලිනොච්චි" },
                  { "id": "Mannar", "title": "Mannar - මන්නාරම" },
                  { "id": "Vavuniya", "title": "Vavuniya - වවුනියාව" },
                  { "id": "Mullaitivu", "title": "Mullaitivu - මුලතිව්" },
                  { "id": "Batticaloa", "title": "Batticaloa - මඩකලපුව" },
                  { "id": "Ampara", "title": "Ampara - අම්පාර" },
                  { "id": "Trincomalee", "title": "Trincomalee - ත්‍රිකුණාමලය" },
                  { "id": "Kurunegala", "title": "Kurunegala - කුරුණෑගල" },
                  { "id": "Puttalam", "title": "Puttalam - පුත්තලම" },
                  { "id": "Anuradhapura", "title": "Anuradhapura - අනුරාධපුරය" },
                  { "id": "Polonnaruwa", "title": "Polonnaruwa - පොළොන්නරුව" },
                  { "id": "Badulla", "title": "Badulla - බදුල්ල" },
                  { "id": "Monaragala", "title": "Monaragala - මොනරාගල" },
                  { "id": "Ratnapura", "title": "Ratnapura - රත්නපුර" },
                  { "id": "Kegalle", "title": "Kegalle - කෑගල්ල" }
                ]
              },
              {
                "type": "TextCaption",
                "text": "District | දිස්ත්‍රික්කය"
              },
              {
                "type": "TextBody",
                "text": "2 Available Mobiles | භාවිතයේ පවතින දුරකතන අංක 2ක්"
              },
              {
                "type": "TextInput",
                "label": "07X XXX XXXX",
                "name": "mobile_phone",
                "required": true,
                "input_type": "number"
              },
              {
                "type": "TextInput",
                "label": "011X XXX XXX",
                "name": "land_line",
                "required": false,
                "input_type": "number"
              },
              {
                "type": "Footer",
                "label": "Continue",
                "on_click_action": {
                  "name": "navigate",
                  "next": "deliver_reqs",
                  "payload": {
                    "full_name": "${form.full_name}",
                    "address": "${form.address}",
                    "city": "${form.city}",
                    "district": "${form.district}",
                    "mobile_phone": "${form.mobile_phone}",
                    "land_line": "${form.land_line}"
                  }
                }
              }
            ]
          }
        ]
      }
    },
    {
      "id": "deliver_reqs",
      "title": "Delivery Details",
      "terminal": true,
      "data": {
        "full_name": { "type": "string", "__example__": "John Doe" },
        "address": { "type": "string", "__example__": "123 Main St" },
        "city": { "type": "string", "__example__": "Colombo" },
        "district": { "type": "string", "__example__": "Colombo" },
        "mobile_phone": { "type": "string", "__example__": "0771234567" },
        "land_line": { "type": "string", "__example__": "0112345678" }
      },
      "layout": {
        "type": "SingleColumnLayout",
        "children": [
          {
            "type": "Form",
            "name": "delivery_reqs_form",
            "children": [
              {
                "type": "TextBody",
                "text": "ඔබගේ නිවස ආසන්නයට Dimo ලොරි එකක් පැමිණිය හැකිද?"
              },
              {
                "type": "RadioButtonsGroup",
                "label": "Can a lorry reach your home?",
                "name": "can_lorry_reach_home",
                "required": true,
                "data_source": [
                  { "id": "yes", "title": "Yes | ඔව්" },
                  { "id": "no", "title": "No | නැත" }
                ]
              },
              {
                "type": "TextBody",
                "text": "නැතිනම්, කොපමණ දුරක් ඔසවාගෙන යා යුතුද? (මීටර් වලින්)\nIf no, how far does it need to be carried? (in meters)"
              },
              {
                "type": "TextInput",
                "label": "00",
                "name": "carry_distance",
                "required": false,
                "input_type": "number"
              },
              {
                "type": "TextBody",
                "text": "බෙදාහැරීම සඳහා පඩිපෙල් හෝ උඩුමහල් තිබේද?"
              },
              {
                "type": "RadioButtonsGroup",
                "label": "Are there any stairs?",
                "name": "are_there_any_stairs",
                "required": true,
                "data_source": [
                  { "id": "yes", "title": "Yes | ඔව්" },
                  { "id": "no", "title": "No | නැත" }
                ]
              },
              {
                "type": "TextBody",
                "text": "ඔව් නම්, කරුණාකර විස්තර සපයන්න (උදා: තට්ටු ගණන, පඩිපෙළේ පළල).\nIf yes, please provide details (e.g., number of floors, staircase width)."
              },
              {
                "type": "TextArea",
                "label": "Stair Details",
                "name": "stair_details",
                "required": false
              },
              {
                "type": "Footer",
                "label": "Done",
                "on_click_action": {
                  "name": "complete",
                  "payload": {
                    "can_lorry_reach_home": "${form.can_lorry_reach_home}",
                    "carry_distance": "${form.carry_distance}",
                    "are_there_any_stairs": "${form.are_there_any_stairs}",
                    "stair_details": "${form.stair_details}",
                    "full_name": "${data.full_name}",
                    "address": "${data.address}",
                    "city": "${data.city}",
                    "district": "${data.district}",
                    "mobile_phone": "${data.mobile_phone}",
                    "land_line": "${data.land_line}"
                  }
                }
              }
            ]
          }
        ]
      }
    }
  ]
}

const enhanced_form = 
{
  "version": "7.1",
  "screens": [
    {
      "id": "client_data",
      "title": "Customer Details",
      "data": {},
      "layout": {
        "type": "SingleColumnLayout",
        "children": [
          {
            "type": "Form",
            "name": "client_data_form",
            "children": [
              {
                "type": "TextInput",
                "label": "Full Name",
                "name": "full_name",
                "required": true,
                "input_type": "text",
                "helper_text": "Full Name | සම්පූර්ණ නම"
              },
              {
                "type": "TextArea",
                "label": "Address",
                "name": "address",
                "required": true,
                "helper_text": "Address | ලිපිනය"
              },
              {
                "type": "TextInput",
                "label": "City",
                "name": "city",
                "required": true,
                "input_type": "text",
                "helper_text": "City | ආසන්නතම නගරය"
              },
              {
                "type": "Dropdown",
                "label": "District",
                "name": "district",
                "required": true,
                "data_source": [
                  { "id": "Colombo", "title": "Colombo - කොළඹ" },
                  { "id": "Gampaha", "title": "Gampaha - ගම්පහ" },
                  { "id": "Kalutara", "title": "Kalutara - කළුතර" },
                  { "id": "Kandy", "title": "Kandy - මහනුවර" },
                  { "id": "Matale", "title": "Matale - මාතලේ" },
                  { "id": "Nuwara Eliya", "title": "Nuwara Eliya - නුවර එළිය" },
                  { "id": "Galle", "title": "Galle - ගාල්ල" },
                  { "id": "Matara", "title": "Matara - මාතර" },
                  { "id": "Hambantota", "title": "Hambantota - හම්බන්තොට" },
                  { "id": "Jaffna", "title": "Jaffna - යාපනය" },
                  { "id": "Kilinochchi", "title": "Kilinochchi - කිලිනොච්චි" },
                  { "id": "Mannar", "title": "Mannar - මන්නාරම" },
                  { "id": "Vavuniya", "title": "Vavuniya - වවුනියාව" },
                  { "id": "Mullaitivu", "title": "Mullaitivu - මුලතිව්" },
                  { "id": "Batticaloa", "title": "Batticaloa - මඩකලපුව" },
                  { "id": "Ampara", "title": "Ampara - අම්පාර" },
                  { "id": "Trincomalee", "title": "Trincomalee - ත්‍රිකුණාමලය" },
                  { "id": "Kurunegala", "title": "Kurunegala - කුරුණෑගල" },
                  { "id": "Puttalam", "title": "Puttalam - පුත්තලම" },
                  { "id": "Anuradhapura", "title": "Anuradhapura - අනුරාධපුරය" },
                  { "id": "Polonnaruwa", "title": "Polonnaruwa - පොළොන්නරුව" },
                  { "id": "Badulla", "title": "Badulla - බදුල්ල" },
                  { "id": "Monaragala", "title": "Monaragala - මොනරාගල" },
                  { "id": "Ratnapura", "title": "Ratnapura - රත්නපුර" },
                  { "id": "Kegalle", "title": "Kegalle - කෑගල්ල" }
                ]
              },
              {
                "type": "TextCaption",
                "text": "District | දිස්ත්‍රික්කය"
              },
              {
                "type": "TextBody",
                "text": "2 Available Mobiles | භාවිතයේ පවතින දුරකතන අංක 2ක්"
              },
              {
                "type": "TextInput",
                "label": "07X XXX XXXX",
                "name": "mobile_phone",
                "required": true,
                "input_type": "number",
                "helper_text": "Enter a 10-digit mobile number (e.g., 0771234567)",
                "validation_regex": "^07[0-9]{8}$"
              },
              {
                "type": "TextInput",
                "label": "011X XXX XXX",
                "name": "land_line",
                "required": false,
                "input_type": "number",
                "helper_text": "Enter a 10-digit landline number (e.g., 0112345678)",
                "validation_regex": "^01[0-9]{8}$"
              },
              {
                "type": "Footer",
                "label": "Continue",
                "on_click_action": {
                  "name": "navigate",
                  "next": "deliver_reqs",
                  "payload": {
                    "full_name": "${form.full_name}",
                    "address": "${form.address}",
                    "city": "${form.city}",
                    "district": "${form.district}",
                    "mobile_phone": "${form.mobile_phone}",
                    "land_line": "${form.land_line}"
                  }
                }
              }
            ]
          }
        ]
      }
    },
    {
      "id": "deliver_reqs",
      "title": "Delivery Details",
      "terminal": true,
      "data": {
        "full_name": { "type": "string", "__example__": "John Doe" },
        "address": { "type": "string", "__example__": "123 Main St" },
        "city": { "type": "string", "__example__": "Colombo" },
        "district": { "type": "string", "__example__": "Colombo" },
        "mobile_phone": { "type": "string", "__example__": "0771234567" },
        "land_line": { "type": "string", "__example__": "0112345678" }
      },
      "layout": {
        "type": "SingleColumnLayout",
        "children": [
          {
            "type": "Form",
            "name": "delivery_reqs_form",
            "children": [
              {
                "type": "TextBody",
                "text": "ඔබගේ නිවස ආසන්නයට Dimo ලොරි එකක් පැමිණිය හැකිද?"
              },
              {
                "type": "RadioButtonsGroup",
                "label": "Can a lorry reach your home?",
                "name": "can_lorry_reach_home",
                "required": true,
                "data_source": [
                  { "id": "yes", "title": "Yes | ඔව්" },
                  { "id": "no", "title": "No | නැත" }
                ]
              },
              {
                "type": "TextBody",
                "text": "නැතිනම්, කොපමණ දුරක් ඔසවාගෙන යා යුතුද? (මීටර් වලින්)\nIf no, how far does it need to be carried? (in meters)",
                "visible": "${form.can_lorry_reach_home == 'no'}"
              },
              {
                "type": "TextInput",
                "label": "00",
                "name": "carry_distance",
                "required": false,
                "input_type": "number",
                "visible": "${form.can_lorry_reach_home == 'no'}"
              },
              {
                "type": "TextBody",
                "text": "බෙදාහැරීම සඳහා පඩිපෙල් හෝ උඩුමහල් තිබේද?"
              },
              {
                "type": "RadioButtonsGroup",
                "label": "Are there any stairs?",
                "name": "are_there_any_stairs",
                "required": true,
                "data_source": [
                  { "id": "yes", "title": "Yes | ඔව්" },
                  { "id": "no", "title": "No | නැත" }
                ]
              },
              {
                "type": "TextBody",
                "text": "ඔව් නම්, කරුණාකර විස්තර සපයන්න (උදා: තට්ටු ගණන, පඩිපෙළේ පළල).\nIf yes, please provide details (e.g., number of floors, staircase width).",
                "visible": "${form.are_there_any_stairs == 'yes'}"
              },
              {
                "type": "TextArea",
                "label": "Stair Details",
                "name": "stair_details",
                "required": false,
                "visible": "${form.are_there_any_stairs == 'yes'}"
              },
              {
                "type": "Footer",
                "label": "Done",
                "on_click_action": {
                  "name": "complete",
                  "payload": {
                    "customer": {
                      "full_name": "${data.full_name}",
                      "address": "${data.address}",
                      "city": "${data.city}",
                      "district": "${data.district}",
                      "mobile_phone": "${data.mobile_phone}",
                      "land_line": "${data.land_line}"
                    },
                    "delivery": {
                      "lorry_access": "${form.can_lorry_reach_home}",
                      "carry_distance_meters": "${form.carry_distance}",
                      "stairs_present": "${form.are_there_any_stairs}",
                      "stair_details": "${form.stair_details}"
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
