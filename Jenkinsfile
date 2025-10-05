pipeline {
    agent { label "kms" }

    stages {
        stage("Code") {
            steps {
                echo "Cloning the code..."
                git url: "https://github.com/km-saifullah/node-jenkins-basic.git", branch: "main"
            }
        }

        stage("Build") {
            steps {
                echo "Building Docker image..."
                sh "docker build -t node-demo:latest ."
                echo "Docker image created."
            }
        }

        stage("Push") {
            steps {
                echo "Pushing Docker image to Docker Hub..."
                withCredentials([usernamePassword(credentialsId: "dockerHubCredential", usernameVariable: "dockerHubUser", passwordVariable: "dockerHubPass")]) {
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                    sh "docker image tag node-demo:latest ${env.dockerHubUser}/node-demo:latest"
                    sh "docker push ${env.dockerHubUser}/node-demo:latest"
                }
            }
        }

        stage("Deploy") {
            steps {
                echo "Deploying application..."
                sh "docker compose up -d"
                echo "Application is running!"
            }
        }
    }
}
