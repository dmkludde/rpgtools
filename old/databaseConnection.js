var databases = {
    'local' : { 'url' : 'mongodb://localhost:27017/rpg' },
    'remote' : { 'url' : 'mongodb://dmkludde:halftwee@kahana.mongohq.com:10044/app29324067'}
    
};
module.exports = function (config) {
    if (databases[config.instancetype]) {
        return databases[config.instancetype];
    } else {
        return databases.local;
    }
};