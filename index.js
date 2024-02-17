const innerlayoutcont = document.getElementById("component_layout_inner_cont");
const optionarr = [];

innerlayoutcont.addEventListener('click',(event) => {
    console.log(event.target.tagName)
    if(event.target.tagName === "BUTTON")
    {
        let temp = event.target.value;
        temp = temp.split(' ');

        if(temp[0] === "edit")
            handleEditComponent(temp[1]);
        else if(temp[0] === "delete")
            handleDeleteComponent(temp[1]);
        else if(temp[0] === "cancel")
            handleCancelComponent(temp[1]);
        else
            return
    }
    else if(event.target.tagName === "HEADER")
    {
        const child = event.target;
        const parent = child.parentElement;

        handleComponentSelection(parent);
    }
})


const generateUuid = () => {
    
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
  
    for (var i = 0; i < 20; i++) {
        result += characters[Math.floor(Math.random() * charactersLength)];
    }
  
    return result;

}


const handleComponentSelection = (parent) => {
    
    parent.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px';
    parent.children[4].style.display="flex";
    
}


const handleEditComponent = (id) => {
    const parent = document.getElementById(id);

    let value = parent.children[0].innerHTML;
    parent.children[0].innerHTML=`Editing ${value}`

    let prevlabelvalue = value;
    let prevplaceholdervalue = parent.children[3].getAttribute("placeholder");
    parent.children[1].value = prevlabelvalue;
    parent.children[2].value = prevplaceholdervalue;

    parent.children[1].style.display="block";
    parent.children[2].style.display="block";
    parent.children[3].style.display="none";

    const btn3 = parent.children[4].children[2];
    btn3.value = "";

    btn3.innerHTML = 'Confirm'

    btn3.addEventListener("click",() => {

        parent.children[0].innerHTML = parent.children[1].value;
        parent.children[3].setAttribute("placeholder",parent.children[2].value);

        handleCancelComponent(id);

    })
    
}

const handleCancelComponent = (id) =>{

    const component = document.getElementById(id);

    component.style.boxShadow=""
    component.children[4].style.display="";

    component.children[1].style.display="";
    component.children[2].style.display="";
    component.children[3].style.display="";

    const btn3 = component.children[4].children[2];
    btn3.value = `cancel ${id}`;
    btn3.innerHTML = "Cancel";
}

const handleDeleteComponent = (id) => {
    document.getElementById(id).remove();
}

const handleComponentAdd = (type) => {

    const id = generateUuid();

    const component = document.createElement("section");
    component.setAttribute("id",id);
    component.setAttribute("class","component");
    component.setAttribute("draggable","true");

    const label = document.createElement("header");
    const input_label = document.createElement("input");
    const input_placeholder = document.createElement("input");

    label.setAttribute("class","component_header");
    label.style.boxShadow=""

    input_label.setAttribute("class","component_input");
    input_label.setAttribute("placeholder","Enter Label Name");

    input_placeholder.setAttribute("class","component_input");
    input_placeholder.setAttribute("placeholder","Enter Placeholder Name");

    const btnsection = document.createElement("section");
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");

    btn1.value=`edit ${id}`;
    btn2.value=`delete ${id}`;
    btn3.value=`cancel ${id}`;

    btn1.style.backgroundColor = "#1E90FF"
    btn1.style.color = "#000000"

    btn1.style.padding = "8px ";
    btn2.style.padding = "8px";
    btn3.style.padding = "8px";

    btn2.style.backgroundColor = "#ff5548"
    btn2.style.color = "#000000"

    btn3.style.backgroundColor="#b9b9b9"

    btn1.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg> Edit';
    btn2.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path></svg> Delete';
    btn3.innerHTML="Cancel"

    btnsection.setAttribute("class","component_managers");
    btnsection.append(btn1, btn2, btn3);

    let temp;

    if(type === "input")
    {
        label.innerHTML = "Sample Label";

        const input_text = document.createElement("input");
        input_text.setAttribute("class","component_input_type1");
        input_text.setAttribute("placeholder","Sample placeholder");

        temp = input_text;
    }
    else if(type === "select")
    {
        label.innerHTML = "Select";

        const select = document.createElement("select");
        select.setAttribute("class","component_input_type2");
        
        const option = document.createElement("option");
        option.innerHTML = "Sample option"

        option.value = "";
        option.selected = true;
        option.disabled = true;
        option.hidden = true;

        select.append(option);

        input_placeholder.setAttribute("placeholder","Enter options, each option should be separated by a space")

        temp = select;
    }
    
    else
    {
        label.innerHTML = "Sample Textarea";

        const input_area = document.createElement("textarea");
        input_area.setAttribute("class","component_input_type3");
        input_area.setAttribute("placeholder","Sample Placeholder");

        temp = input_area;
    }

    component.append(label,input_label,input_placeholder,temp,btnsection);

    innerlayoutcont.append(component);

    component.addEventListener("dragstart",() => {
        component.classList.add("component_dragging")
    });

    component.addEventListener("dragend",() => {
        component.classList.remove("component_dragging");
    })

    innerlayoutcont.addEventListener('dragover', (e) => {
        e.preventDefault()
        console.log(component);
        const afterElement = getDragAfterElement(innerlayoutcont, e.clientY)
        console.log(afterElement);
        const draggable = document.querySelector('.component_dragging')
        innerlayoutcont.insertBefore(draggable, afterElement)
      })

      const getDragAfterElement = (component, y) => {
        const draggableElements = [...component.querySelectorAll('.component:not(.component_dragging)')]
        console.log(draggableElements);
        return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect()
          const offset = y - box.top - box.height / 2
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
          } else {
            return closest
          }
        }, { offset: Number.NEGATIVE_INFINITY }).element
      }

}

const handleLayoutSave = () => {
    
    const component_children = innerlayoutcont.children;
    const list = [];
    
    for (let i = 0; i < component_children.length; i++) {
        
        const obj = {};
        obj.id = component_children[i].getAttribute("id");
        obj.label = component_children[i].children[0].innerHTML;
        
        if( component_children[i].children[3].tagName === "INPUT"  ){
            obj.type = "input";
            obj.placeholder = component_children[i].children[3].getAttribute("placeholder");
        }
        else if( component_children[i].children[3].tagName === "SELECT" ){
            obj.type = "select";
            obj.options = ["Sample option","Sample option","Sample option"]
        }
        else{
            obj.type = "textarea";
            obj.placeholder = component_children[i].children[3].getAttribute("placeholder");
        }

        list.push(obj);

    }
    console.log(list);
    console.log(JSON.stringify(list));

}