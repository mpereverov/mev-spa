properties([
	parameters([
		string(
			defaultValue: 'mpereverov/mev-api',
			description:'Docker Image Name',
			name: 'IMAGE_NAME',
			trim: true
		)
	])
])

pipeline {
	agent any
	stages {
		stage('Build Push') {
			steps {
				withCredentials([usernamePassword(credentialsId: 'dockeruser', 
					passwordVariable: 'docker_PASSWORD', usernameVariable: 'docker_USERNAME')]) {
					sh "docker login --username=$docker_USERNAME --password=$docker_PASSWORD"
	    			sh "docker build -t $IMAGE_NAME:$env.BUILD_NUMBER ."
	    			sh "docker push $IMAGE_NAME:$env.BUILD_NUMBER"
	    			sh "docker logout"
	    			sh "docker image rmi $IMAGE_NAME:$env.BUILD_NUMBER"
				}
			}
		}
	}
	post {
    	success {
    		build job: 'Deploy_SPA_component', 
		    	parameters: [
		    		string(name: 'component_NAME', value: 'spa'),
		    		string(name: 'img_NAME', value: "$env.IMAGE_NAME"), 
	    		    string(name: 'img_TAG', value: "$env.BUILD_NUMBER")
		    	], quietPeriod: 0, wait: false
    	}
  	}
}