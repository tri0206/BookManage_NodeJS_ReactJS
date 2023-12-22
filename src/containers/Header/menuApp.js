export const adminMenu = [
    { //hệ thống
        name: 'menu.system.header', menus: [
            {
                name: 'menu.system.system-administrator.header',
                subMenus: [
                    { name: 'menu.system.system-administrator.reader-manage', link: '/system/reader-manage' },
                    { name: 'menu.system.system-administrator.author-manage', link: '/system/author-manage' },
                    { name: 'menu.system.system-administrator.book-manage', link: '/system/book-manage' },
                ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
];