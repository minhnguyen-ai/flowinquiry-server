package io.flexwork.statemachine.service;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.statemachine.StateMachine;
import org.springframework.statemachine.service.DefaultStateMachineService;
import org.springframework.statemachine.service.StateMachineService;

public class ExtDefaultStateMachineService<S, E> implements StateMachineService<S, E>, DisposableBean {

    private DefaultStateMachineService<S, E> stateMachineService;

    private ExtStateMachineListener<S, E> stateMachineListener = new ExtStateMachineListener<>();

    public ExtDefaultStateMachineService(DefaultStateMachineService<S, E> stateMachineService) {
        this.stateMachineService = stateMachineService;
    }

    @Override
    public void destroy() throws Exception {
        stateMachineService.destroy();
    }

    @Override
    public StateMachine<S, E> acquireStateMachine(String machineId) {
        return acquireStateMachine(machineId, true);
    }

    @Override
    public StateMachine<S, E> acquireStateMachine(String machineId, boolean start) {
        StateMachine<S, E> stateMachine = stateMachineService.acquireStateMachine(machineId);
        stateMachine.removeStateListener(stateMachineListener);
        stateMachine.addStateListener(stateMachineListener);
        return stateMachine;
    }

    @Override
    public void releaseStateMachine(String machineId) {
        stateMachineService.releaseStateMachine(machineId);
    }

    @Override
    public void releaseStateMachine(String machineId, boolean stop) {
        stateMachineService.releaseStateMachine(machineId, stop);
    }
}
