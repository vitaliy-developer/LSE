# LSE
We check our service on the minikube: 
> minikube service web-app-static --url

### Testing "sealed-secrets":

* $ wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.18.1/controller.yaml
* $ kubectl apply -f controller.yaml
* $ kubectl get pods -n kube-system | grep sealed-secrets-controller
* $ brew install kubeseal
* $ secret.yaml // Create secrets
* $ kubeseal --secret-file secret.yaml --sealed-secret-file sealed-secret.yaml // Use the following command to convert the secret.yaml file into an encrypted sealed-secret.yaml file 
* $ kubectl create -f sealed-secret.yaml // To create an encrypted file
* $ kubectl get  sealedsecret.bitnami.com/database-credentials // Get our secrets
* $ kubectl logs -n kube-system sealed-secrets-controller-846f459596-xcmfn // Check log

![alt text](https://github.com/vitaliy-developer/LSE/blob/main/img/img101.png)
