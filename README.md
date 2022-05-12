# NodeJS-Express-DualRobot-Monitoring


## Introduction

Like before this project is used to monitor two robots but this time using NodeJS and the ExpressJS web development Framework. However, another difference is that Jaeger is not used here at all. However, most of what I've done in similar projects have worked on this project. Like before I will break down the project and also explain some differences.

## Breakdown of Project

### Code Breakdown

Unlike with Python, there are several files that are important to make this code run successfully. First we have `index.js` where the main logic resides. This code requires several modules including `express-prometheus-middleware` which is required to connect our application to Prometheus. Then there's `pigpio-client` that is required for the robots to work properly. With this module, we define our clients using the IP addresses and then we make sure that `pigpio` is enabled on our robots. To do this we can simply run `sudo pigpiod` or enable Remote GPIO on our Raspberry Pis using `sudo raspi-config` or the Configuration Menu. To run the code first we have to install the modules from our `package-lock.json` file by running `npm install` and all we do next is run `node index.js`. Then we access our application at `0.0.0.0:3001` and then we should be able to see the application as shown below. Then we can start moving our robots to make sure the base code works properly. We can then go to `/metrics` and check to make sure the metrics have been collected.

![app](https://github.com/sentairanger/NodeJS-Express-DualRobot-Monitoring/blob/main/images/app.png)

### Docker

Like before, once the application has successfully run we can then package it using Docker. This time we have different steps and I will cover them below:

* FROM: In this case we are using Node 14 slim but you can substitute this with a more recent version.
* WORKDIR: Here we choose our working directory which will be `/app`.
* COPY: Here we are copying our two `json` files
* RUN: Here we install our modules from our `package-lock.json` file.
* COPY: We copy our files to our current directory
* CMD: We run the main JS application

Like before build the image with `docker build -t node-dualrobot .`. Then test run the newly created image with `docker run -d -p 3001:3001 node-dualrobot`. Once it runs properly you can tag the image with `docker tag node-dualrobot <your-dockerhub-name>/node-dualrobot:<tag>` and then make sure to login with `docker login` with your Dockerhub credentials. Then push with `docker push <your-dockerhub-name>/node-dualrobot:<tag>`.

### Kubernetes

Like before, after we successfully create our Docker image, we then deploy our application using Kubernetes. The `node-dualrobot.yaml` file can be found in the Kubernetes directory.
* The Deployment manifest: This adds our Docker image which points to our application. We also make sure that Prometheus can access our application at the `/metrics` endpoint.
* The Service Manifest: This is our service where it is set to port 3001. 
* The ServiceMonitor Manifest: This sets up our service monitor where Prometheus can scrape our application at the `/metrics` endpoint.

The diagram of the project is posted below. To run the cluster, run the command `kubectl apply -f node-dualrobot.yaml`. The deploy, service and servicemonitor should appear. You can test the app with the command `kubectl port-forward svc/node-dualrobot 3001`. Or use `3001:3001` if running inside a VagrantBox.

![cluster](https://github.com/sentairanger/NodeJS-Express-DualRobot-Monitoring/blob/main/images/Node%20Diagram.drawio.png)

### Github Actions

Under the actions section there are two files that build new Docker images.

* `docker-build.yml`: The images are tagged with the latest tag.
* `docker-sha-tag.yml`: The images are tagged with a SHA tag for security.

### ArgoCD

Like before, we can also deploy our application using ArgoCD. This can be deployed inside the VagrantBox or locally. I have provided two yaml files under the argocd directory to access the ArgoCD GUI and also deploy the application. To install ArgoCD I have provided a script under the scripts directory to install it along with generating a password. After installing the application you can deploy the cluster with `kubectl apply -f dualrobot-argocd.yaml`. Then the cluster should appear as shown below.

![argocd](https://github.com/sentairanger/NodeJS-Express-DualRobot-Monitoring/blob/main/images/argocd.png)

### Prometheus

Once the cluster is running we need to install Prometheus and Grafana to make sure we can monitor our robots. I have provided a script under the same scripts directory to install both services. Once installed we can check to see if Prometheus can see our cluster by running `kubectl port-forward -n monitoring svc/prometheus-kube-prometheus-prometheus 9090`. Then we can go to `localhost:9090` or replace localhost with the IP address of your VagrantBox and then go to Status and Targets. If we see our application then everything is working properly.

### Grafana

Once we start moving our robots we can see the data collected by Prometheus by accessing Grafana. We can do this by running `kubectl port-forward -n monitoring svc/prometheus-grafana 3000` and then we can go to `localhost:3000` or like before just replace localhost with the VagrantBox IP Address. Login in with admin and prom-operator as the default password. Change the password for security reasons. I have provided a json file for the Dashboard and all you need to do is to import it and then refresh the dashboard if needed. It should look similar to the one shown below.

![grafana](https://github.com/sentairanger/NodeJS-Express-DualRobot-Monitoring/blob/main/images/dashboard.png)

## VagrantBox

I have provided a Vagrantfile if you wish to run this on your PC and don't have the hardware to run it.
