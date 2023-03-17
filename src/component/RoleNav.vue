<script>
import { Menu, MenuItem, Submenu } from "element-ui"
    export default {
        name: "RoleNav",
        props: {
            navObj: {
                type: Object,
                default: {}
            },
            handleClick: {
                type: Function
            }
        },
        // 渲染函数
        render(h) {
            // 创建菜单的子元素
            function createMenuChild(obj,indexes) {
                let res = []
                for(let key in obj) {
                    if(Array.isArray(obj[key])) {
                        res.push(h(MenuItem,{
                            props: {
                                index: indexes.join("-")
                            }
                        },[h("span",{slot: "title"},key)]))
                        
                    } else if(typeof obj[key] === "object") {
                        res.push(h(Submenu,{
                            props: {
                                index: indexes.join("-")
                        }},[h("span",{slot: "title"},key),...createMenuChild(obj[key],[...indexes,1])]))
                    }
                    indexes[indexes.length-1]++;
                }
                return res;
            }
            return h('div',{
                attrs: {
                    class: "role_nav-container"
                }
                },[
                    h(Menu,{
                        on: {
                            select:this.handleClick
                        }
                    },createMenuChild(this.navObj,[1]))
                ]
            )
        }
    }
</script>

<style lang="less" scoped>

</style>