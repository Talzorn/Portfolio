module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb-base',
        'plugin:vue/essential',
        'plugin:vue/vue3-recommended',
        'plugin:nuxt/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 10,
        sourceType: 'module',
    },
    plugins: [
        'vue',
    ],
    rules: {
        'comma-dangle': ['error', 'never'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'vue/html-indent': ['error', 4, {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: false,
            ignores: [],
        }],
        'max-len': ['error', { code: 200 }],
        'vue/max-len': ['error', {
            code: 200,
            template: 200,
        }],
        'no-param-reassign': [
            'error',
            {
                'props': true,
                'ignorePropertyModificationsFor': [
                    'state'
                ]
            }
        ],
        'import/no-extraneous-dependencies': ['error', {'devDependencies': true}]
    },
    settings: {
        'import/core-modules': ['vue', 'vuex'],
        'import/resolver': {
            nuxt: {
                extensions: ['.js', '.vue'],
            },
        },
    },
};
