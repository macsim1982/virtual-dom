/** @jsx h */
function h(type, props, ...children) {
    return {
        type,
        props,
        children
    };
}


const li = (item, index) => (
    <li class="li" key={index}>
        {item.name} vient davoir {item.age} ans
    </li>
);

const childTpl = (data) => (
    <ul>
        {li(data.list[0])}
        {li(data.list[1])}
        {li(data.list[2])}
    </ul>
);



export const dynamicTpl = (data) => (
    <div class="module">
        <ul>
            <li class={data.current ? 'is-active' : ''}>name: <span>{data.name}</span></li>
            <li class="age">age: <span>{data.age}</span></li>
            <li>{childTpl(data) }</li>
        </ul>
    </div>
);