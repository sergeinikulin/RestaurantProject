<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page session="false" %>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<spring:url value="/main/ajax" var="mainAjaxUrl"></spring:url>
<html>
<head>
	<title>Main Page</title>
</head>
<body>
<h1>
	Main Page using Axios get to return JSON objects.  
</h1>
<h2>
	We should modify this jsp to use React components and css.  
</h2>
<a href="https://github.com/gary-tipton-rsi/axiosMvcRestfulReact">Download Code</a>

<P>  The time on the server is ${serverTime}. </P>
<div id="mainAjaxDiv"></div>
<script>

function getMainAjaxHtml(data) {
	//return data.obj1;
	
	return "<table border='1'>"
	+"<tr><td width='20px'>" + data.obj1.id + "</td><td width='50px'>" + data.obj1.name + "</td><td width='200px'>" + data.obj1.value + "</td><td width='200px'>" + data.obj1.updateDate + "</td></tr>"
	+"<tr><td width='20px'>" + data.obj2.id + "</td><td width='50px'>" + data.obj2.name + "</td><td width='200px'>" + data.obj2.value + "</td><td width='200px'>" + data.obj2.updateDate + "</td></tr>"	
	+"</table>";	
}

function getMainAjax() {
axios.get('${mainAjaxUrl}')
.catch(function (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
})
.then(function(response) {
	document.getElementById("mainAjaxDiv").innerHTML = getMainAjaxHtml(response.data);
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });

}

//call the function
getMainAjax();
</script>

</body>
</html>
