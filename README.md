 # Management Rental House
![image](https://user-images.githubusercontent.com/32244766/104813288-edf66100-5810-11eb-9f45-b3b1f039f69b.png)

## General info
<table>
<tr>
<td>
    This project aims to create a management system for the owner and the host to facilitate the administration of rented properties and maintain the relationship between the host and the owner.
</td>
</tr>
</table>
Achieving the goal involves achieving the objectives: 
 * managing and monitoring data about the host; 
 * property records; 
 * managing and making payments; 
 * communication through the messaging channel.

## Built with 

- [ReactJs](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Redux](https://react-redux.js.org/introduction/quick-start) - Redux is a state cntainer management framework for JavaScript applications.
- [Bootstrap](http://getbootstrap.com/) - Extensive list of components and  Bundled Javascript plugins.
- [Chart.js](https://www.chartjs.org/docs/latest/) - Simple yet flexible JavaScript charting for designers & developers.

## Setup
To run this project, install it locally using npm:

```
$ cd ../manage-rent
$ npm install
$ npm start
```

### House Management
The housing management module includes their creation, which is then used to assign each host to a home and check the occupancy status of the homes to maximize the profit obtained from the rental services provided.

![houses](https://user-images.githubusercontent.com/32244766/106201268-e0ea5200-61c0-11eb-8dcf-844361b4c59c.png)

The list of homes provides a clear view of the properties owned by the owner and which he wants or already offers rental services. The system offers the possibility to edit housing data to provide truthful information and ensure the quality of services.

![edithouse](https://user-images.githubusercontent.com/32244766/106201286-e8a9f680-61c0-11eb-8b3c-a7b8d136751f.png)
### Tenants
The host management module includes viewing the list of created hosts, creating new host entities, editing them, inviting by link, archiving, assigning them to homes.

![tenants](https://user-images.githubusercontent.com/32244766/106201397-155e0e00-61c1-11eb-87b6-129e9c0d76ba.png)
### Payment Management

PayPal, an online payment operator, was used to provide good payment functionality. It was decided to create subscriptions on a payment plan based on a product created by the owner. The host can sign up for a payment plan, so he will be able to make payments on the services provided by the owner much simpler and easier.

![createplan](https://user-images.githubusercontent.com/32244766/106201320-f790a900-61c0-11eb-9d08-7d114baa0f97.png)

Once you want to subscribe or unsubscribe, a host will have to change the status of the checkbox as needed, after which the data will be saved by accessing the save button for the changes made.

![detailsplan](https://user-images.githubusercontent.com/32244766/106201359-ffe8e400-61c0-11eb-85d7-7a6252bda640.png)

Once the owner has created the subscriptions and subscribed to one of his hosts to the plan that created it, then the list of subscriptions he has will appear on the host's page.

![subscr](https://user-images.githubusercontent.com/32244766/106201387-0c6d3c80-61c1-11eb-8a69-ed29d0dfb03e.png)

### Invitations

Once the owner has created the subscriptions and subscribed to one of his hosts to the plan that created it, then the list of subscriptions he has will appear on the host's page.

![list_inviatation](https://user-images.githubusercontent.com/32244766/104813205-61e43980-5810-11eb-9435-b48aae5ba198.png)

### Chat
![conv](https://user-images.githubusercontent.com/32244766/106201442-227afd00-61c1-11eb-87f3-ac95e70b4c20.png)

### Register
![registe](https://user-images.githubusercontent.com/32244766/106201059-8f41c780-61c0-11eb-8209-56a8e7912270.png)
### Login
![login](https://user-images.githubusercontent.com/32244766/106201238-d4fe9000-61c0-11eb-87b3-9466fdd72844.png)
