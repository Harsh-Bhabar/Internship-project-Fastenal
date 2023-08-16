package com.ecom.cartorderswishlist.controller;

import com.ecom.cartorderswishlist.dto.Order;
import com.ecom.cartorderswishlist.exception.LogExceptionWithMessage;
import com.ecom.cartorderswishlist.response.ResponseHandler;
import com.ecom.cartorderswishlist.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;

@RestController
@RequestMapping(path = "/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrdersController {
    public final OrdersService ordersService;

    @Autowired
    OrdersController(OrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @GetMapping("/{userName}")
    public ResponseEntity<Object> getOrdersForUserName(@PathVariable("userName") String userName) {
        try {
            Optional<List<Order>> orders = ordersService.getOrdersForUserName(userName);
            if (orders.isPresent())
                return ResponseHandler.generateResponse("Orders for user retrieved successfully!", HttpStatus.OK, orders);
            else
                return ResponseHandler.generateResponse("Unable to retrieve order details!", HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting order details with userName: " + userName, e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @GetMapping("/order-id/{orderId}")
    public ResponseEntity<Object> getOrderByOrderId(@PathVariable("orderId") String orderId) {
        try {
            Optional<Order> orders = ordersService.getOrderByOrderId(orderId);
            if (orders.isPresent())
                return ResponseHandler.generateResponse("Order for orderId retrieved successfully!", HttpStatus.OK, orders);
            else
                return ResponseHandler.generateResponse("Unable to retrieve order details!", HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting order details for orderId: " + orderId, e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @GetMapping(path = "/sort-by-time/{userName}/{ascOrDesc}")
    public ResponseEntity<Object> getSortedOrdersForUserName(@PathVariable("userName") String userName, @PathVariable("ascOrDesc") String ascOrDesc) {
        try {
            Optional<List<Order>> orders = ordersService.getSortedOrdersForUserName(userName, ascOrDesc);
            if (orders.isPresent())
                return ResponseHandler.generateResponse("Sorted orders for user retrieved successfully!", HttpStatus.OK, orders);
            else
                return ResponseHandler.generateResponse("Unable to retrieve sorted orders!", HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting sorted orders with userName: " + userName, e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PostMapping(path = "/{userName}")
    public ResponseEntity<Object> addOrderForUserName(@PathVariable("userName") String userName, @RequestBody Order order) {
        try {
            ordersService.addOrderForUserName(userName, order.getOrderItems(), order.getTotalPrice(), LocalDate.now(), order.getAddress());
            return ResponseHandler.generateResponse("Order added successfully!", HttpStatus.OK, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception adding order for userName: " + userName, e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @DeleteMapping(path = "/{orderId}")
    public ResponseEntity<Object> deleteOrderById(@PathVariable("orderId") String orderId) {
        try {
            ordersService.deleteOrderById(orderId);
            return ResponseHandler.generateResponse("Order deleted successfully!", HttpStatus.OK, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception deleting order for id: " + orderId, e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }
}
