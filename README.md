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

### Encrypted -> decrypted -> encrypted (local sealed-secrets)

* $ kubeseal --fetch-cert > sealed-secrets.pem // store the certificate offline and create sealed secrets without having access to the controller
* $ kubectl get secret -n kube-system -l sealedsecrets.bitnami.com/sealed-secrets-key -o yaml > backup-sealedSecret.key // we can backup the secret attached to the controller which contains the certificate and key. The key is used for the operation of decrypting sealed secrets into secrets.
* $ kubectl get sealedsecret database-credentials-test-2 -o yaml > sealed-secret-test.yaml // sealedsecret 'database-credentials-test-2' in yaml 
* $ kubeseal --recovery-unseal -f sealed-secret-test.yaml --recovery-private-key backup-sealedSecret.key -o yaml > secret-test.yaml // Decrypt locally
* $ kubeseal --cert ./sealed-secrets.pem -o yaml < secret-test.yaml --sealed-secret-file sealed-secret-test.yaml // Encrypt locally SealedSecret
* $ kubectl apply -f sealed-secret-test.yaml

![alt text](https://github.com/vitaliy-developer/LSE/blob/main/img/img101.png)
