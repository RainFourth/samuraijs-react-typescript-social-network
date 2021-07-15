




export const initialState = {
    profile: {
        posts: [
            {id: 1, msg: "Hi, how are you?", likesCnt: 0},
            {id: 2, msg: "It's my first post", likesCnt: 23},
        ],
        newPostVal: "it-kamasutra.com",
        profile: null,
    },
    dialogs: {
        dialogs: [
            {id: 1, name: "Dimych"},
            {id: 2, name: "Andrew"},
            {id: 3, name: "Sveta"},
            {id: 4, name: "Sasha"},
            {id: 5, name: "Viktor"},
            {id: 6, name: "Valera"},
        ],
        selectedUserId: undefined,

        messages: {

            messages: [
                {id: 1, mine: true, msg: "Hi"},
                {id: 2, mine: true, msg: "How is your it-kamasutra?"},
                {id: 3, mine: false, msg: "Yo"},
                {id: 4, mine: true, msg: "Yo"},
                {id: 5, mine: false, msg: "Yo"}
            ],
            newMsg: "",

            /*msgBlocks: [
                {
                    userId: 1,
                    messages: [
                        {id: 1, mine: true, msg: "Hi"},
                        {id: 2, mine: true, msg: "How is your it-kamasutra?"},
                        {id: 3, mine: false, msg: "Yo"},
                        {id: 4, mine: true, msg: "Yo"},
                        {id: 5, mine: false, msg: "Yo"}
                    ],
                    newMsg: "",
                },
                {
                    userId: 2,
                    messages: [
                        {id: 3, mine: false, msg: "Yo"},
                        {id: 4, mine: true, msg: "Yo"},
                        {id: 5, mine: false, msg: "Yo"}
                    ],
                    newMsg: "",
                },
            ],*/
        },
    },
    friends: [
        {name: "Andrew", ava: "https://media.sonicscanf.org/gallery/knuckles-the-echidna/sonic-adventure-2-battle.png"},
        {name: "Sasha", ava: "https://banner2.kisspng.com/20180417/ckw/kisspng-tails-sonic-the-hedgehog-sonic-chaos-shadow-the-he-fox-5ad6572a4268c8.880208941523996458272.jpg"},
        {name: "Dimych", ava: "https://tcrf.net/images/a/a0/ContraHardCorps-FangIntro.png"},
    ],
    users: {
        users: [
            {id: 1, fullName: "Dimych", photoUrl: "https://tcrf.net/images/a/a0/ContraHardCorps-FangIntro.png",
                status: "I am a boss", location: {country: "Belarus", city: "Minsk"}, followed: false},
            {id: 2, fullName: "Sasha", photoUrl: "https://banner2.kisspng.com/20180417/ckw/kisspng-tails-sonic-the-hedgehog-sonic-chaos-shadow-the-he-fox-5ad6572a4268c8.880208941523996458272.jpg",
                status: "I am a boss too", location: {country: "Russia", city: "Moscow"}, followed: true},
            {id: 3, fullName: "Andrew", photoUrl: "https://media.sonicscanf.org/gallery/knuckles-the-echidna/sonic-adventure-2-battle.png", status: "I am a boss too", location: {country: "Ukraine", city: "Kiev"}, followed: false},
            {id: 4, fullName: "Dmitriy K.", photoUrl: "",
                status: "I am looking for a Job right now...", location: {country: "Belarus", city: "Minsk"}, followed: false},
            {id: 5, fullName: "Svetlana D.", photoUrl: "",
                status: "I am so pretty", location: {country: "Belarus", city: "Minsk"}, followed: true},
            {id: 6, fullName: "Sergei S.", photoUrl: "",
                status: "I like football!!!", location: {country: "Ukraine", city: "Kiev"}, followed: false},
            {id: 7, fullName: "Andrew T.", photoUrl: "",
                status: "I am free to help you to create good Video Production", location: {country: "United States", city: "Philadelphia"}, followed: false},
        ],

    },



}