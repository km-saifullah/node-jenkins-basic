# Node.js Application with Jenkins CI/CD Pipeline

This repository contains a Node.js application with a complete CI/CD pipeline setup using Jenkins and Docker. The pipeline automates the process of building, pushing Docker images to Docker Hub and deploying the application using Docker Compose.

![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-blue?logo=jenkins&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI/CD-orange?logo=github-actions&logoColor=white)
![Git](https://img.shields.io/badge/Git-red?logo=git&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-blue?logo=docker&logoColor=white)

## Project Structure

```bash
node-jenkins-basic/
├── server.js              # Node.js code
├── Dockerfile             # Dockerfile to containerize the app
├── docker-compose.yml     # Docker Compose configuration
├── Jenkinsfile            # Jenkins declarative pipeline configuration
├── package.json
├── package-lock.json
└── README.md
```

## Prerequisites

- Node.js installed on the app server
- Docker and Docker Compose installed
- Jenkins installed on a dedicated CI server
- Git installed
- Docker Hub account (for storing Docker images)
- Basic knowledge of Git, Docker and Jenkins pipelines

## Jenkins Setup

Follow these steps to set up Jenkins:

1. Install OpenJDK 21 (Ubuntu example):

```bash
sudo apt update
sudo apt install fontconfig openjdk-21-jre
java -version
openjdk version "21.0.3" 2024-04-16
OpenJDK Runtime Environment (build 21.0.3+11-Debian-2)
OpenJDK 64-Bit Server VM (build 21.0.3+11-Debian-2, mixed mode, sharing)
```

2. Install Jenkins

```bash
sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update
sudo apt install jenkins
```

3. Access Jenkins
   Open `http://<JENKINS_SERVER_IP>:8080` in your browser
4. Unlock Jenkins
   Use the password from

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

5. Install Suggested Plugins when prompted
6. Create Admin User and log in
7. Configure NodeJS and Docker on Jenkins Agent

- Install NodeJS plugin and Docker plugin
- Configure NodeJS installation and Docker path
- Make sure the Jenkins agent node can run Docker commands (use `sudo usermod -aG docker jenkins`)

8. Add Docker Hub Credentials in Jenkins:

- Go to Manage Jenkins > Credentials > System > Global credentials
- Add credentials with your Docker Hub username and password
- Use an ID like: dockerHubCredential

## Pipeline Configuration

Create a Jenkinsfile in the repository root:

```bash
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
```

## CI/CD Pipeline Process

1. **Code Stage**: Jenkins clones the repository from GitHub.
2. **Build Stage**: Jenkins builds a Docker image from the Dockerfile.
3. **Push Stage**: Jenkins pushes the Docker image to Docker Hub using credentials.
4. **Deploy Stage**: Jenkins deploys the container using Docker Compose on the server.

This process ensures automatic build, push and deployment whenever you update your code in GitHub.

## Deployment

1. Make sure Docker and Docker Compose are installed on the deployment server
2. Ensure the Jenkins agent has SSH access to the deployment server
3. Run the pipeline in Jenkins
4. Access the application at `http://<DEPLOYMENT_SERVER_IP>:5000`

## Conclusion

This repository demonstrates a complete CI/CD pipeline setup for a Node.js application using Jenkins, Docker and GitHub. By following this workflow, you can automate code deployment, ensure consistent builds and maintain high-quality production releases with minimal manual intervention.

I welcome contributions, feedback and improvements to make this project even better.

## Connect

**Author**: Khaled Md Saifullah
**GitHub**: [km-saifullah](https://github.com/km-saifullah)
**LinkedIn**: [Khaled Md Saifullah](https://linkedin.com/in/kmsaifullah)
