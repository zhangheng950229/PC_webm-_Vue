const key = 'VUE-CHAT-v3';

// 虚拟数据
if (!localStorage.getItem(key)) {
    let now = new Date();

    let data = {
        // 登录用户
        user: 
           {
            id: 1,
            //name: '爱新觉罗-琪程',
            //cusmer: '58机器人小八',
            img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=913836838,411507439&fm=27&gp=0.jpg'
           },

        // 用户列表
        userList: [
            {
                id: 2,
                name: '振哥',
                img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=76032127,129304811&fm=27&gp=0.jpg'
            }
        ],

        // 会话列表
        sessionList: [
            {
                userId: 2,
                messages: [
                    // {   
                    //     text: 'h么么哒~我是58机器人小八~很高兴为您服务~',
                    //     name:'58机器人小八',
                    //     date: now
                    // },
                    // {
                    //     text: 'hello，酷狗2',
                    //     name:'小8',
                    //     date: now
                    // },
                    // {
                    //     text: '感谢您的评价！',
                    //     date: now,
                    //     type:1,
                    //     name:'落叶随风'
                    // },
                    // {
                    //     text:'问题',
                    //     date: now,
                    //     type:2,
                    //     name:'落叶随风'
                    // },
                    // {
                    //     data:now,
                    //     type:3,
                    //     name:'落叶随风',
                    //     img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=76032127,129304811&fm=27&gp=0.jpg'
                    // }
                ]
            }
        ],

    };

    localStorage.setItem(key, JSON.stringify(data));
}

export default {
    fetch() {
        return JSON.parse(localStorage.getItem(key));
    },
    save(store) {
        localStorage.setItem(key, JSON.stringify(store));
    }
};
