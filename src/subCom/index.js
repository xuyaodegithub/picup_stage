import Vue from 'vue'
import '@/style/public.css';
import filters from '@/filters/filters'
Object.keys(filters).map((val,index)=>{
    Vue.filter(val,filters[val])
})
import {  Button, Input, Table, TableColumn,  Radio, RadioGroup, Dialog, Select, Option,Dropdown, DropdownMenu, DropdownItem, Message, Pagination, Loading, Checkbox,Scrollbar,Upload,Notification, Container, Header, Aside, Main, Footer, Menu, Submenu, MenuItem, MenuItemGroup,Breadcrumb, BreadcrumbItem,
    Tag,Avatar,Rate,select, Form, FormItem,MessageBox,DatePicker,Tooltip,Image} from 'element-ui'
Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000 };
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Dialog.name, Dialog);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Scrollbar.name, Scrollbar);
Vue.prototype.$message = Message;
Vue.component(Pagination.name, Pagination);
Vue.component(Upload.name, Upload);
Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Aside.name, Aside);
Vue.component(Main.name, Main);
Vue.component(Footer.name, Footer);
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);
Vue.component(Tag.name, Tag);
Vue.component(Rate.name, Rate);
Vue.component(Avatar.name, Avatar);
Vue.component(select.name, select );
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Image.name, Image);
Vue.prototype.$confirm = MessageBox.confirm;

Vue.prototype.$loading = Loading.service;
Vue.use(Loading.directive);
Vue.prototype.$notify = Notification;
Vue.directive('drag',(event)=>{
    let oDiv=event;
    oDiv.onmousedown=(ev)=>{
        if(!ev.target.className.includes('v_title')) return;
        let x=ev.clientX-oDiv.offsetLeft;
        let y=ev.clientY-oDiv.offsetTop;
        document.onmousemove=(e)=>{
            let l=e.clientX-x;
            let t=e.clientY-y;
            oDiv.style.left=l+'px';
            oDiv.style.top=t+'px';
        }
        document.onmouseup=(e)=>{
            document.onmousemove=null;
            document.onmouseup=null;
        }
    }

})
