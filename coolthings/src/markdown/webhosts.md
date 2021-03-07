# Web/server/VM/compute hosts

## data transfer costs

- comparing $5/Mo plans as the baseline for included data pricing
- comparing regions Europe (North America is very similar)

| host | data tx ($ GB/Mo) | data included (GB) |
| :- | -: | -: |
| [vultr](https://www.vultr.com/products/cloud-compute/#pricing) | 0.01 | 1000 |
| [digitalocean](https://www.digitalocean.com/pricing/) | 0.01 | 1000 |
| [aws](https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer) | 0.09 | 1 | 
| [MS azure](https://azure.microsoft.com/en-us/pricing/details/bandwidth/) | 0.085* | 0* |
| [G cloud](https://cloud.google.com/vpc/network-pricing) | 0.12* | 0 |
| [Kamatera](https://www.kamatera.com/Products/250/Pricing) | 0.01 | 1000-5000* |

*MS: complicated... might be either 5 or 0 GB included, also not sure if the price is 0.02 (Intracontinental) or 0.085 (Internet Egress), assuming the worst case

*Google: Premium pricing is default 0.12, must explicitly set to use 'standard' to get 0.085.

*Kamatera: depends on region

digitalocean seems to have the simplest pricing model for data transfer (followed by vultr), DO = all regions the same.