(
    function(){
        function validate(username){
            var valid=true;

            if(!username){
                return false;
            }

            if(username.length<6){
                return false;
            }

            if(username.length!==username.match(/[a-z0-9\@\.]/ig).length){
                valid=false;
            }

            return valid;
        }

        awesome.validators.username=validate;
    }
)();
