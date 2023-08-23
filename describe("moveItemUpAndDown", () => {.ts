describe("moveItemUpAndDown", () => {
  test("should move the item up within the same column", () => {
    const state = {
      todos: [
        {
          id: 1,
          title: "Column 1",
          tasks: [
            { id: 1, title: "Task 1", status: "Column 1" },
            { id: 2, title: "Task 2", status: "Column 1" },
            { id: 3, title: "Task 3", status: "Column 1" },
          ],
        },
      ],
    };
    const action = {
      payload: {
        category: { id: 1 },
        event: { target: null },
        filteredTodos: [
          {
            id: 1,
            title: "Column 1",
            tasks: [
              { id: 1, title: "Task 1", status: "Column 1" },
              { id: 2, title: "Task 2", status: "Column 1" },
              { id: 3, title: "Task 3", status: "Column 1" },
            ],
          },
        ],
        targetItem: { columnIndex: 0, todoIndex: 1 },
        dragItemNode: { current: null },
        dragItem: { current: { columnIndex: 0, todoIndex: 2 } },
        setFilteredTodos: jest.fn(),
      },
    };

    const expectedState = {
      todos: [
        {
          id: 1,
          title: "Column 1",
          tasks: [
            { id: 1, title: "Task 1", status: "Column 1" },
            { id: 3, title: "Task 3", status: "Column 1" },
            { id: 2, title: "Task 2", status: "Column 1" },
          ],
        },
      ],
    };

    const result = moveItemUpAndDown(state, action);
    expect(result).toEqual(expectedState);
    expect(action.payload.setFilteredTodos).toHaveBeenCalledWith(expectedState);
  });

  test("should move the item down to a different column", () => {
    const state = {
      todos: [
        {
          id: 1,
          title: "Column 1",
          tasks: [
            { id: 1, title: "Task 1", status: "Column 1" },
            { id: 2, title: "Task 2", status: "Column 1" },
          ],
        },
        {
          id: 2,
          title: "Column 2",
          tasks: [
            { id: 3, title: "Task 3", status: "Column 2" },
            { id: 4, title: "Task 4", status: "Column 2" },
          ],
        },
      ],
    };
    const action = {
      payload: {
        category: { id: 2 },
        event: { target: {} },
        filteredTodos: [
          {
            id: 1,
            title: "Column 1",
            tasks: [
              { id: 1, title: "Task 1", status: "Column 1" },
              { id: 2, title: "Task 2", status: "Column 1" },
            ],
          },
          {
            id: 2,
            title: "Column 2",
            tasks: [
              { id: 3, title: "Task 3", status: "Column 2" },
              { id: 4, title: "Task 4", status: "Column 2" },
            ],
          },
        ],
        targetItem: { columnIndex: 1, todoIndex: 0 },
                dragItemNode: { current: {} },
                dragItem: { current: { columnIndex: 0, todoIndex: 1 } },
                setFilteredTodos: jest.fn(),
              },
            };
        
            const expectedState = {
              todos: [
                {
                  id: 1,
                  title: "Column 1",
                  tasks: [
                    { id: 1, title: "Task 1", status: "Column 1" },
                    { id: 2, title: "Task 2", status: "Column 1" },
                  ],
                },
                {
                  id: 2,
                  title: "Column 2",
                  tasks: [
                    { id: 3, title: "Task 3", status: "Column 2" },
                    { id: 4, title: "Task 4", status: "Column 2" },
                  ],
                },
              ],
            };
        
            const result = moveItemUpAndDown(state, action);
            expect(result).toEqual(expectedState);
            expect(action.payload.setFilteredTodos).toHaveBeenCalledWith(expectedState);
          });
        });
        
            