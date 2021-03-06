var user ={
        email:'',
        name: '',
        senha: ''
    }

var dados;
var arranjo=[];

var personArray =arranjo; 

function getPerson(id) {
    for( var i=0;i<personArray.length;i++) {
        if(personArray[i].id == id)
            return personArray[i];
    }  
        return {
            id: "",
            name: "nf",
            location: "loc"
        };
    
}

ngApp.controller('listController',function($scope,$location){
  ajaxUtils.simulate(function(){
        $scope.$apply(function(){
			
			
			 dados = window.localStorage.getItem("dados");
             	
			
			if(dados==null){
				$location.path('/create');	
			}else{
			if(dados!='"[]"'){
			dados=JSON.parse(dados)	
			personArray=[]	
			$.each(dados,function(i,obj){
				personArray.push({'id':obj.id,'name':obj.name,'location':obj.location})
			})	
		     $scope.personArray = personArray;
			}else{
			  $location.path('/create');	
			}	
			}
			
			
			
			
           
        });
        $('ul.ngRepeat').listview('refresh');
    }); 
  
  
});


ngApp.controller('loginController',function($scope,$http,$location){
	
	
	$scope.user=user;
	FastClick.attach(document.body);
	
	

 	
	 $scope.save = async function(user) {
   	 ajaxUtils.simulate(function(){ 
      const options = {
            method: 'get',
            data: {},
            headers: {}
            };
			
	  	
      var endereco='https://app/login.php?email='+user.email+'&senha='+user.senha;
  
       cordova.plugin.http.sendRequest(endereco, options, function(response) {
		  var t=JSON.stringify(response.data);
		 
      if(t=='"[]"'){
        
		 
		 
		 function alertDismissed() {
    // do something
}
navigator.notification.alert(
    'Falha de Acesso!',  // message
    alertDismissed,         // callback
    'Dados incorretos',            // titulo
    'Fechar'                  //nomeButao
);
		 
		 
		 
		 
		 
		 
	   }else{
		location.replace('#/list');
	    }
  
    
}, function(response) {
	
	
	
	
	function alertDismissed3() {
    // do something
}
navigator.notification.alert(
    response.status,  // message
    alertDismissed3,         // callback
    response.error,            // titulo
    'Fechar'                  //nomeButao
);
	

});
	   
}); 	   
	   
	   
 };
	
	
	
	
});






ngApp.controller('viewController',function($scope, $routeParams){
    ajaxUtils.simulate(function(){
        $scope.$apply(function(){
            $scope.person = getPerson($routeParams.id);
        });
    });
    $scope.delete = function(person) {
		
		
		 navigator.notification.confirm(
        'Voc?? perdeu seu amigo !',  // message
		onConfirm,				// callback to invoke with index of button pressed
        'Fim Da Amizade',            // title
        'Deletar'          // buttonLabels
       );
		
		function onConfirm(buttonIndex) {
	    var index = $.inArray(person, personArray);
            personArray.splice(index,1);
			var obj = JSON.stringify(personArray);
		    window.localStorage.setItem("dados",obj);
            location.replace('#/list');
     }
		
		
    };
});

ngApp.controller('editController',function($scope, $routeParams, $location){
    $scope.person = getPerson($routeParams.id);
    $scope.save = function() {
        //model already updated
		var obj = JSON.stringify(personArray);
		window.localStorage.setItem("dados",obj);
        $location.path('/view/'+$scope.person.id);
    };
});
ngApp.controller('createController',function($scope, $location){
    //$scope.personArray = personArray;
    $scope.person = {
        id: personArray.length,
        name: '',
        location: ''
    };
    $scope.save = function() {
        personArray.push($scope.person);
		var obj = JSON.stringify(personArray);
		window.localStorage.setItem("dados",obj);
        $location.path('/list');
    };
});

ngApp.controller('insertController',function($scope,$http,$location){
    $scope.confirmaSenha ='' ;
    $scope.user=user;
	$scope.user.email=''
	$scope.user.senha=''
	
    $scope.cadastrar = function() {
 	  if($scope.user.senha==$scope.confirmaSenha&&$scope.user.nome!=''&&$scope.confirmaSenha.length==8){
		  
		  
		  
 ajaxUtils.simulate(function(){ 
      const options = {
            method: 'get',
            data: {},
            headers: {}
            };
			
	
      var endereco='https://app/login.php?nome='+$scope.user.nome+'&email='+$scope.user.email+'&senha='+$scope.user.senha;  

       cordova.plugin.http.sendRequest(endereco, options, function(response) {
		var t=JSON.stringify(response.data);
		 
      if(t=='"[]"'){
       function alertDismissed() {
    // do something
       }
       navigator.notification.alert(
    'Conex??o Ruim!',  // message
    alertDismissed,         // callback
    'Falha de Rede',            // titulo
    'Fechar'                  //nomeButao
     );
		 
		 
		 
		 
		 
	   }else{
		location.replace('#/login');
	    }
  
    
}, function(response) {
	
	function alertDismissed1() {
    // do something
}
navigator.notification.alert(
    response.status,  // message
    alertDismissed1,         // callback
    response.error,            // titulo
    'Fechar'                  //nomeButao
);

});
	   
}); 
	
	
	
	
	
	
		  
	  }else{
		  function alertDismissed2() {
    // do something
}
navigator.notification.alert(
    'Verifique Novamente!',  // message
    alertDismissed2,         // callback
    'Prencha Corretamente',            // titulo
    'Fechar'                  //nomeButao
);
	  }
};
	
	
	
	
	
	
});

