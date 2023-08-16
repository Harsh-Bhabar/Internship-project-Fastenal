package com.ecom.cartorderswishlist.service;

import com.ecom.cartorderswishlist.dto.Address;
import com.ecom.cartorderswishlist.dto.Order;
import com.ecom.cartorderswishlist.dto.OrderItem;
import com.ecom.cartorderswishlist.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersService {
    private final OrdersRepository ordersRepository;

    @Autowired
    public OrdersService(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    public Optional<List<Order>> getOrdersForUserName(String userName) {
        return ordersRepository.findOrdersForUserName(userName);
    }

    public void addOrderForUserName(String userName, ArrayList<OrderItem> orderItems, float totalPrice, LocalDate timeStamp, Address address) {
        if (orderItems.size() == 0)
            return;
        ordersRepository.save(new Order(userName, orderItems, totalPrice, timeStamp, address));
    }

    public Optional<List<Order>> getSortedOrdersForUserName(String userName, String ascOrDesc) {
        return ordersRepository.findOrdersForUserNameSortedByTime(userName, ascOrDesc.equals("asc") ? 1 : -1);
    }

    public Optional<Order> getOrderByOrderId(String orderId) {
        return ordersRepository.findOrderByOrderId(orderId);
    }

    public void deleteOrderById(String orderId) {
        ordersRepository.deleteById(orderId);
    }
}
